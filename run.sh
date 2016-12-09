#!/usr/bin/env bash
cd;
if [ -d ".0n" ]; then
    cd .0n;
else
    mkdir .0n;
    cd .0n;
fi

if [ -f "config.json" ]; then
    echo "Config exist.";
else
    echo "[]" > config.json;
fi

if [ -f "preferences.json" ]; then
    echo "preferences exist.";
else
    echo '{ "native": true, "key": "", "mail":  { "username": "", "password": "", "to": "", "from": "" }  }' > preferences.json;
fi
echo "Config synced.";
