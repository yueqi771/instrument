class Widgets {
    // 类型存储数组， 会初始化到类型验证函数中
    public typeArray: string[] = ['String', 'Array', 'Number', 'Object'];

    // 类型验证存储对象
	public TypeContent: any = {};

	// 过滤器对象
	public filters: any = {};


    constructor() {
        // 初始化化类型验证函数
		this.initTypeVerifiy(this.typeArray);

    }

    /**
     * @func 初始化验证类型函数
     * @params TypeArray: 支持的类型数组
     */
    initTypeVerifiy(typeArray: string[]): void {

        for (let i = 0, type; type = typeArray[i++];) {
            ((injectType) => {
                this.TypeContent['is' + injectType] = (variable: any) => {
                    return Object.prototype.toString.call(variable) === `[object ${injectType}]`;
                };
            })(type);
        }
	}


    /**
     * @func   工具方法：克隆一个对象
     * @param  obj: 需要复制的对象
     * @return 新的对象
     */
    deepClone(object: any): any {
		const newObject: any = object instanceof Array ? [] : {};
		let count = 0
        //object属于基本数据类型,直接返回object
        if(typeof object !== 'object') {
            return object;
        } else {
            //object属于数组或对象，遍历它们
            for(var i in object) {
				count ++ ;
				if(count > 45) {
					return object;
				}
                newObject[i] = typeof object[i] === 'object' ? this.deepClone(object[i]) : object[i];
            }
        }
        return newObject;
	}

	/**
     * @func   工具方法：判断两个对象的值（浅较）
     */
	isEqualValue(object1: any, object2: any) {
		// Of course, we can do it use for in
		// Create arrays of property names
		const aProps = Object.getOwnPropertyNames(object1);
		const bProps = Object.getOwnPropertyNames(object2);

		// If number of properties is different,
		// objects are not equivalent


		for (let i:number = 0; i < aProps.length; i++) {
			const propName = aProps[i];

			// If values of same property are not equal,
			// objects are not equivalent
			if (object1[propName] !== object2[propName]) {
				return false;
			}
		}

		// If we made it this far, objects
		// are considered equivalent
		return true;
	}

    /**
     * @func   工具方法：生成一个随机的id
     * @return 一个随机的字符串id
     */
    guid (): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4()
    }

    /**
     * @func   工具方法：将指定数据保存到本地
     */
    saveFile(name: string, file: any) {
        const urlObject = window.URL || (window as any).webkitURL || window
        var export_blob = new Blob([file]);
        var saveLink = document.createElement('a');
        saveLink.href = urlObject.createObjectURL(export_blob);
        saveLink.download = name;
        saveLink.click()
	}

	/**
	 * @func 格式化json
	 */
	formatJson(json: string): any {
		// if(json.indexOf('    ') > -1) {return json}
		// 换行后是否增减PADDING的标识
		let paddingIndex = 0;
		// 4个空格符
		const paddingSet = '    ';
		// 输出的json字符串
		let formatted = '';

		if(!(window as any).$parse.TypeContent.isString(json)) {
			json = JSON.stringify(json);
		}

		/**
		 *利用正则类似将{'name':'ccy','age':18,'info':['address':'wuhan','interest':'playCards']}
		*---> \r\n{\r\n'name':'ccy',\r\n'age':18,\r\n
		*'info':\r\n[\r\n'address':'wuhan',\r\n'interest':'playCards'\r\n]\r\n}\r\n
		*/
		json = json.replace(/([\{\}])/g, '\r\n$1\r\n')
						.replace(/([\[\]])/g, '\r\n$1\r\n')
						.replace(/(\,)/g, '$1\r\n')
						.replace(/(\r\n\r\n)/g, '\r\n')
						.replace(/\r\n\,/g, ',');

		/**
		 * 根据split生成数据进行遍历，一行行判断是否增减PADDING
		 */
		let jsonArray = json.split('\r\n');
		jsonArray.forEach((node: any, index: number) => {
			let indent:number = 0,
				padding:string = '';
			if (node.match(/\{$/) || node.match(/\[$/)){
				indent = 1;
			} else if (node.match(/\}/) || node.match(/\]/))  {
				paddingIndex = paddingIndex !== 0 ? --paddingIndex : paddingIndex;
			}else {
				indent = 0;
			}
			for (let i = 0; i < paddingIndex; i++) {
				padding += paddingSet;
			}
			formatted += padding + node + '\r\n';
			paddingIndex += indent;
		});
		return formatted;
	}

	/**
	 * 上传公用方法
	 */
	uploadFile(uploadData: any, id: string, type?: string): void {
		let fileData = new FormData();
		fileData.append('file', uploadData.file);
		(window as any).$http.post({
			url: '/rest/lpadmin/resource/uploadFile',
			data: fileData
		}).then((res: any) => {
			let dataBack = {
				url: res.data,
				name: uploadData.file.name
			},
			dataArray = (window as any).$parse.getData(id);

			if (res.code === 10000 && res.data) {
				if(type === 'array') {
					dataArray.push(dataBack);
					(window as any).$parse.setData('uploadData', id, dataArray, false)

					return;
				}

				(window as any).$parse.setData('uploadData', id, dataBack, false);
				return;
			}

			(window as any).vm.$message({
				message: '上传失败，请重新上传' + res.message,
				type: 'error'
			})
		})
	}

	/**
	 * @func 获取地址栏中的参数
	 */
	getUrlParams(name: string): any {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
		var r = window.location.search.substr(1).match(reg)
		if (r != null) return unescape(r[2])
		return null
	}


	/**
	 * @func 广度优先法遍历ast树
	 * @param nodeData节点数据
	 * @param callBack回调函数
	 */
	traverAst(node:any, callBack?: any): void {
		const _this = this;
		let queue: any[] = [],
			count: number = 0,
			nodeData: any = 	{name: 'cc', children: node};

		while(nodeData != null) {
			callBack && (callBack.apply(callBack, [nodeData, count]));

			if(nodeData.children && nodeData.children.length != 0) {
				count ++ ;
				for(let i: number = 0; i < nodeData.children.length; i++) {
					queue.push(nodeData.children[i]);
				}
			}

			nodeData = queue.shift();
		}

		return nodeData
	}

}

export default Widgets;
