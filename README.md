# RustyVibes

A RustyVibes-compatible keyboard sound pack based on the **CherryMX Blue – PBT keycaps** sounds, with each mapped key exported as its own WAV file.

## Contents

- `cherry-blue-pbt-rustyvibes/` — the ready-to-use sound pack. It contains `config.json` plus individual `key_<keycode>.wav` samples.
- `convert_mechvibes_single.py` — rebuilds the sound pack from Mechvibes' `cherrymx-blue-pbt` source pack. It uses `ffmpeg` to slice the source OGG recording into key samples.
- `mechvibes-extracted/` — the extracted Mechvibes source and reference sound-pack files used for the conversion.

## Using the sound pack

1. Copy the `cherry-blue-pbt-rustyvibes` folder into the folder used by your keyboard-sound application.
2. Import or select the folder as a sound pack.
3. Choose **CherryMX Blue – PBT keycaps** and start typing.

The exact import location depends on the application that consumes Mechvibes-style sound packs.

## Rebuilding the pack

Requirements: Python 3 and [`ffmpeg`](https://ffmpeg.org/).

Run from this repository's root:

```bash
python3 convert_mechvibes_single.py
```

The script reads `mechvibes-extracted/src/audio/cherrymx-blue-pbt/config.json`, slices `sound.ogg` according to its key definitions, and regenerates the WAV files and `config.json` in `cherry-blue-pbt-rustyvibes/`.

## Credits and licensing

This project is derived from the [Mechvibes](https://github.com/hainguyents13/mechvibes) project and its CherryMX Blue – PBT keycaps sound pack. The included Mechvibes source retains its upstream MIT license, available at [`mechvibes-extracted/LICENSE`](mechvibes-extracted/LICENSE). No additional rights are granted for audio beyond the rights supplied with the included upstream materials.

## Repository hygiene

Generated dependencies and local operating-system files are excluded from version control. The audio files are intentionally tracked because they are the sound pack itself.
