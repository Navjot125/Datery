export default FileUploader = (url, fromData, onProgress) => {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open(fromData.method || 'get', url);
    for (let i in fromData.headers || {})
      xhr.setRequestHeader(i, fromData.headers[i]);
    xhr.onload = e => res(e.target);
    xhr.onerror = rej;
    if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    xhr.send(fromData.body);
  });
};
