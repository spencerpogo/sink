{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell { nativeBuildInputs = with pkgs; [ nodejs-14_x nodePackages.yarn postgresql_13 ]; }
