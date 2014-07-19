function buildAll() {
    var source = document.getElementById('source').value;
    var files = getFiles(source);
    buildTreeMap(files);
}
