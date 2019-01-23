export function matchChineseLetterAndNum(value) {
	var pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
	if(pattern.test(value)) {
		return true;
	} else {
		return false;
	}
};
