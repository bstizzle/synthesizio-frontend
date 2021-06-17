## SYNTHESIZIO

An app to quickly make, edit, and save synthesizer settings.

## Technologies and Features
Project created with:
* React: 17.0.1
* Material-UI: 4.11

Current synth features:
* Two oscillators with variable frequencies and waveforms
* Two types of distortion filters with distortion gain setting and on/off toggle (0 distortion gain is DIFFERENT than no distortion)
* Clickable keyboard to play with your sound, maintains the interval between your oscillator frequencies ascending/descending from the first oscillator

Planned synth features:
* More distortion types (potentially allowed the user to make their own filter curve)
* Variable reverb
* More effects (flange, tremolo, etc)

Current site features:
* Can sign up as a new user or log in as existing, with auth using sessions
* Can create new synthesizer settings and save them to your account
* Can open saved settings to play with and edit them
* Can click on the labels for aspects of the synth to see descriptions of each parameter
* Can delete synth settings from your account
* Can browse, play with, and save to your account other users' synths
* Can play the synthesizer either with an 88-key point-and-click keyboard, or with a one octave player using your computer keyboard

## Setup

To run this project, first follow the [backend setup](https://github.com/bstizzle/synthesizio-backend)

```
$ cd ../synthesizio-frontend
$ npm install
$ npm start
```
