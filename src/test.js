(function () {
	IX.ns("Test");
	Test.TestRoot = "../test/data";
	var TestFiles = [
		Test.TestRoot + "/app.js",
		Test.TestRoot + "/shopquery.js",
		Test.TestRoot + "/groupstatistic.js"
	];
	Test.readyToTest = function (pageFn) {
		IX.Net.loadJsFiles(TestFiles, pageFn);
	};
})();