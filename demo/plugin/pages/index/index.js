Page({
	onLoad: function () {
		wx.request({
			url: 'https://www.qwqoffice.com/html2wxml/example.html',
			success: res => {
				wx.stopPullDownRefresh();
				this.setData({ text: res.data });
			}
		})
	},
	wxmlTagATap(e) {
		console.log(e);
	},
	onPullDownRefresh() {
		this.onLoad();
	}
})