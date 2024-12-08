#!/bin/bash

echo "Processing Aptfile..."
while IFS= read -r package; do
    echo "Trying to install $package..."
    if ! apt-get install -y --no-install-recommends $package; then
        echo "Skipping $package as it could not be installed."
    fi
done < Aptfile
