cd ./img/galery
for file in *.jpg; do cwebp -q 50 "$file" -o "${file%.*}.webp"; done
