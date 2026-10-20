#!/usr/bin/env python3

import json
import subprocess
from pathlib import Path

SOURCE = Path.home() / "Music/RustyVibes/mechvibes-extracted/src/audio/cherrymx-blue-pbt"
DEST = Path.home() / "Music/RustyVibes/cherry-blue-pbt-rustyvibes"

config = json.loads((SOURCE / "config.json").read_text())

DEST.mkdir(parents=True, exist_ok=True)

defines = config["defines"]

new_defines = {}

for keycode, value in defines.items():
    if not isinstance(value, list) or len(value) != 2:
        print(f"Skipping {keycode}: {value}")
        continue

    start_ms, length_ms = value
    output = DEST / f"key_{keycode}.wav"

    print(f"Key {keycode}: {start_ms}ms + {length_ms}ms")

    subprocess.run([
        "ffmpeg",
        "-y",
        "-hide_banner",
        "-loglevel", "error",
        "-ss", str(start_ms / 1000),
        "-i", str(SOURCE / "sound.ogg"),
        "-t", str(length_ms / 1000),
        "-c:a", "pcm_s16le",
        str(output)
    ], check=True)

    new_defines[keycode] = output.name

new_config = {
    "id": config.get("id", "cherry-blue-pbt-rustyvibes"),
    "name": config.get("name", "CherryMX Blue - PBT keycaps"),
    "key_define_type": "multi",
    "includes_numpad": config.get("includes_numpad", False),
    "defines": new_defines
}

(DEST / "config.json").write_text(
    json.dumps(new_config, indent=2) + "\n"
)

print()
print("Conversion complete!")
print(f"Soundpack: {DEST}")
print(f"Audio files: {len(new_defines)}")
