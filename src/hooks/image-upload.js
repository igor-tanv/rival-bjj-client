

export default function imageUpload(fileRef, setValues) {

  const file = fileRef.current && fileRef.current.files[0];
  if (!file) return

  // Load the image
  var reader = new FileReader();
  reader.onload = function (readerEvent) {
    var image = new Image();
    image.onload = function (imageEvent) {

      // Resize the image
      const canvas = document.createElement('canvas')
      const max_size = 180
      let width = image.width
      let height = image.height

      if (width > height) {
        if (width > max_size) {
          height *= max_size / width;
          width = max_size;
        }
      } else {
        if (height > max_size) {
          width *= max_size / height;
          height = max_size;
        }
      }

      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(image, 0, 0, width, height);

      const resizedImage = canvas.toDataURL('image/jpeg')

      setValues((prev) => ({
        ...prev,
        avatar: resizedImage,
      }));
    }
    image.src = readerEvent.target.result;
  }
  reader.readAsDataURL(file);
}

