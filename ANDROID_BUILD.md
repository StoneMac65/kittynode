# Android Build Guide

## Prerequisites

- Java 17
- Android SDK (API 34)
- Android NDK (26.3.11579264)
- Rust with Android targets
- Bun

## Setup

Install Android SDK and NDK:

```bash
# Set environment variables
export ANDROID_HOME=$HOME/Android/Sdk
export NDK_HOME=$ANDROID_HOME/ndk/26.3.11579264
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Install SDK components
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0" "ndk;26.3.11579264"
```

Add Rust Android targets:

```bash
rustup target add aarch64-linux-android
```

## Build

Initialize Android project:

```bash
just android-init
```

Build APK:

```bash
just android-build
```

Output: `packages/app/src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk`

## Sign APK

```bash
# Generate keystore
keytool -genkey -v -keystore release.keystore -alias kittynode -keyalg RSA -keysize 2048 -validity 10000

# Sign
cd packages/app/src-tauri/gen/android/app/build/outputs/apk/universal/release
apksigner sign --ks /path/to/release.keystore --out signed.apk app-universal-release-unsigned.apk
```

## Notes

- Only ARM64 architecture is supported
- Unsigned APK requires signing before installation
- Minimum Android version: 7.0 (API 24)

