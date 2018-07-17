Page({
	data: {
	},
	onLoad: function () {
		wx.request({
			url: 'https://www.qwqoffice.com/html2wxml/example.html',
			success: res => {
				wx.stopPullDownRefresh();
				this.setData({ html: res.data });
			}
		})
		/*
		wx.request({
			url: 'https://www.qwqoffice.com/html2wxml/example.html',
			success: res => {
				wx.request({
					url: 'https://www.qwqoffice.com/html2wxml/',
					data: {
						text: res.data,
						type: 'html',
						linenums: true,
						highlight: true
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						this.setData({ json: res.data });
					}
				})
			}
		})*/
	},
	wxmlTagATap(e) {
		console.log(e);
	},
	onPullDownRefresh() {
		this.onLoad();
	}
})
