/**
 * Project: html2wxml
 * Description: 将HTML、Markdown转为微信小程序WXML 
 * Author: 幻想小籽
 * Organization: QwqOffice (https://www.qwqoffice.com)
 */

/**
 * 配置及公有属性
 **/
var realWindowWidth = 0;
var realWindowHeight = 0;
wx.getSystemInfo({
	success: function (res) {
		realWindowWidth = res.windowWidth
		realWindowHeight = res.windowHeight
	}
})
/**
 * 主函数入口区
 **/
function html2wxml(bindName = 'wxmlData', data, target, imagePadding) {
	var that = target, images;
	if (that.data[bindName] != undefined) {
		images = that.data[bindName].images;
	}
	data = { bind: bindName, nodes: data, images: images };
	data.view = {};
	data.view.imagePadding = 0;
	if (typeof (imagePadding) != 'undefined') {
		data.view.imagePadding = imagePadding
	}
	var bindData = {};
	bindData[bindName] = data;
	that.setData(bindData);
	that.wxmlImgLoad = wxmlImgLoad;
	that.wxmlImgTap = wxmlImgTap;
}

// 图片点击事件
function wxmlImgTap(e) {

	var that = this;
	var nowImgUrl = e.target.dataset.src;
	var tagFrom = e.target.dataset.from;

	if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
		var imageUrls = that.data[tagFrom].imageUrls,
			newImageUrls = [];
		for (var i in imageUrls) {
			if (imageUrls[i] !== undefined) {
				newImageUrls.push(imageUrls[i]);
			}
		}
		if (newImageUrls.length > 0) {
			wx.previewImage({
				current: nowImgUrl,
				urls: newImageUrls
			})
		}
	}
}

/**
 * 图片视觉宽高计算函数区 
 **/
function wxmlImgLoad(e) {
	var that = this,
		bindName = e.target.dataset.from,
		idx = e.target.dataset.idx;
	if (typeof (bindName) != 'undefined' && bindName.length > 0) {
		calMoreImageInfo(e, idx, that, bindName)
	}
}
// 假循环获取计算图片视觉最佳宽高
function calMoreImageInfo(e, idx, that, bindName) {

	//因为无法获取view宽度 需要自定义padding进行计算
	var recal = wxAutoImageCal(e.detail.width, e.detail.height, that, bindName);
	that.setData({
		[bindName + '.images[' + idx + ']']: { width: recal.imageWidth, height: recal.imageHeight },
		[bindName + '.imageUrls[' + idx + ']']: e.currentTarget.dataset.src,
	})
}

// 计算视觉优先的图片宽高
function wxAutoImageCal(originalWidth, originalHeight, that, bindName) {

	// 获取图片的原始长宽
	var windowWidth = 0, windowHeight = 0;
	var autoWidth = 0, autoHeight = 0;
	var results = {};
	var padding = that.data[bindName].view.imagePadding;
	windowWidth = realWindowWidth - 2 * padding;
	windowHeight = realWindowHeight;

	// 判断按照那种方式进行缩放
	// 在图片width大于手机屏幕width时候
	if (originalWidth > windowWidth) {
		autoWidth = windowWidth;
		autoHeight = (autoWidth * originalHeight) / originalWidth;
		results.imageWidth = autoWidth;
		results.imageHeight = autoHeight;
	}
	// 否则展示原来的数据
	else {
		results.imageWidth = originalWidth;
		results.imageHeight = originalHeight;
	}
	return results;
}

module.exports = {
	html2wxml: html2wxml
}