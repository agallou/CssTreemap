function getFiles(source) {
    var parser = new CSSParser();

    var sheet = parser.parse(source, false, true);

    var files = {};
    var key = 'No file';
    var selectorcount = 0;
    var rulecount = 0;
    var lastFileName = 0;
    var filename = 0;
    for (var i=0;i<(sheet.cssRules.length);i++) {

        var element = sheet.cssRules[i];

        if (typeof  element.media !== 'undefined') {
            //aller dans les enfants pour les médias (cssRules?)
            continue;
        }

        if (typeof  element.error !== 'undefined') {
            continue;
        }

        if (element.parsedCssText.search(/@font-face/) !== -1) {
            continue;
        }

        var countInElement = 0;
        if (typeof  element.mSelectorText !== 'undefined') {
            countInElement = element.mSelectorText.split(',').length;
        }


        var isComment = typeof element.mSelectorText === 'undefined';

	if (!isComment) {
          selectorcount += countInElement;
          rulecount++;
	}

        var isNewFile = false;

        if (isComment) {
            var endOfComment = element.parsedCssText.split(',')[1];
            if (typeof endOfComment !== 'undefined') {
                filename = endOfComment.substring(0, endOfComment.length-3);
                isNewFile = filename !== lastFileName;
            }
        }

        var isLast = (i == sheet.cssRules.length-1);
        if (isNewFile || isLast) {
	    if ((typeof files[lastFileName]) != 'undefined') {
              files[lastFileName].selectorcount += selectorcount;
              files[lastFileName].rulescount += rulecount;
            } else {
              files[lastFileName] = {
                  selectorcount: selectorcount,
                  rulescount: rulecount,
                  name: lastFileName
              };
            }
            key = element.parsedCssText;
            selectorcount = 0;
            rulecount = 0;
        }


        lastFileName = filename;
    }

    return  $.map(files, function(value, index) {
      return [value];
    });
}
