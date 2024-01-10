for file in *.*; do cwebp -q 18 "$file" -o "${file%.*}.webp"; done
