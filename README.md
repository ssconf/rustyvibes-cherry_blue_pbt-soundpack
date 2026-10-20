# RustyVibes Cherry Blue PBT Soundpack

A RustyVibes-compatible keyboard sound pack inspired by Cherry MX Blue switches fitted with PBT keycaps. This repository contains a ready-to-use set of individual per-key WAV samples, along with the script used to regenerate the pack from a Mechvibes source recording.

## Overview

This sound pack is designed to reproduce the crisp, tactile, and satisfying feel of Cherry Blue switches paired with PBT keycaps. The generated audio samples are organized by key code so they can be used in RustyVibes and other Mechvibes-style keyboard sound pack systems.

## Included in this repository

- `cherry-blue-pbt-rustyvibes/` — the generated sound pack, ready to import into a compatible application
- `convert_mechvibes_single.py` — rebuilds the pack from a Mechvibes source audio file
- `mechvibes-extracted/` — the extracted Mechvibes source data and reference assets used during conversion
- `README.md` — project documentation

## Sound pack structure

The generated sound pack directory includes:

- `config.json` — metadata describing the sound pack and key-to-sample mappings
- `key_<keycode>.wav` — one WAV file per key, extracted from the source audio

For example:

- `key_1.wav`
- `key_10.wav`
- `key_65.wav`
- `key_74.wav`

## How to use it

1. Copy the `cherry-blue-pbt-rustyvibes` directory to the folder used by your keyboard sound application.
2. Import or select the folder as a sound pack in the app.
3. Choose the Cherry Blue / PBT sound profile and begin typing.

The exact import location depends on the app or platform that consumes RustyVibes/Mechvibes-compatible packs.

## Rebuilding the pack

Requirements:

- Python 3
- `ffmpeg` installed and available in your `PATH`

From the repository root, run:

```bash
python3 convert_mechvibes_single.py
```

The script:

- reads the Mechvibes source configuration at `mechvibes-extracted/src/audio/cherrymx-blue-pbt/config.json`
- loads `sound.ogg` from the source pack
- slices the relevant sections for each key using the timing data in the config
- writes new per-key WAV files to `cherry-blue-pbt-rustyvibes/`
- generates an updated `config.json` with the exported sound file names

Important note:

The conversion script currently points to local paths under `~/Music/RustyVibes/...`. If your project is stored elsewhere, edit the `SOURCE` and `DEST` variables at the top of `convert_mechvibes_single.py` before running it.

## Example usage of the conversion script

```python
SOURCE = Path.home() / "Music/RustyVibes/mechvibes-extracted/src/audio/cherrymx-blue-pbt"
DEST = Path.home() / "Music/RustyVibes/cherry-blue-pbt-rustyvibes"
```

If your repository is checked out in a different directory, update those paths to match your local setup.

## Credits and licensing

This project is derived from the [Mechvibes](https://github.com/hainguyents13/mechvibes) project and its CherryMX Blue – PBT keycaps sound pack. The included Mechvibes source materials retain their original upstream licensing and attribution.

This repository packages the converted audio and the generation script for RustyVibes-compatible use.

## Repository hygiene

Generated outputs and platform-specific temporary files are intentionally not tracked. The audio assets are included because they are the actual sound pack content.

## Project purpose

This repository exists to provide a clean, reusable, and easily importable Cherry Blue + PBT keyboard sound pack for RustyVibes users who want a distinctive mechanical typing profile without needing to recreate the audio manually.
