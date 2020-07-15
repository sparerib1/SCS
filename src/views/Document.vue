<template>
  <div id="app-container" class="app-container" style="height: calc(100% - 10px)">
    <el-row style="height: 100%;">
      <el-col onselectstart="return false;" :span="24" style="height:100%;padding-left:0px;">
        <div class="uploaderDiv">
          <uploader
            :options="options"
            :fileStatusText="fileStatusText"
            :autoStart="autoStart"
            @file-added="fileadded"
            @file-removed="fileremoved"
            @files-added="filesadded"
            @file-success="fileSuccess"
            @file-progress="fileProgress"
            @file-complete="fileComplete"
            class="uploader-example"
            ref="uploader"
          >
            <uploader-unsupport></uploader-unsupport>
            <uploader-drop id="drop">
              <div
                separator-class="el-icon-arrow-right"
                style="left:10px;position:absolute;line-height: 40px"
              >
                <label class="folderBreadcrumb kd" @click="handleNodeClick(0)">
                  <label class="el-icon-sort-down"></label>
                  返回上一级
                  <i>|</i>
                </label>
                <label
                  v-for="(val,index) in folderBreadcrumb"
                  :class="['folderBreadcrumb',{ 'kd': index!=folderBreadcrumb.length-1 }]"
                  :key="index"
                  @click="handleNodeClick(val)"
                >
                  {{val.Name}}
                  <i class="el-icon-arrow-right"></i>
                </label>
              </div>
              
              <div
                class="uploader-btn"
                style="width:60px;right:226px;"
                @click="deleteDocumentFolder"
              >
                <i class="el-icon-folder-delete"></i> 删除
              </div>
              <uploader-btn>
                <i class="el-icon-upload2"></i> 上传
              </uploader-btn>
              <div class="uploader-btn" style="width:60px;right:10px;">
                <i class="el-icon-download"></i> 下载
              </div>

              <div
                separator-class="el-icon-arrow-right"
                style="left:10px; bottom:10px;position:absolute;line-height: 40px;color:#242D47"
              >
                <label>{{tableData.length}} 个项目 选中 {{currSelection.length}} 个</label>
              </div>
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top:50px"
                :height="tableHeight"
                :highlight-current-row="true"
                @selection-change="handleSelectionChange"
                @cell-dblclick="cellDblclick"
                @cell-mouse-enter="cellMouseEnter"
                @cell-mouse-leave="cellMouseLeave"
                @current-change="handleCurrentChange"
                @cell-click="cellClick"
                @select="select"
                @select-all="select"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                  class="wjName"
                  style="cursor: pointer;"
                  prop="Name"
                  label="文件名"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <img
                      v-if="!scope.row.Suffix"
                      style="position: absolute;top:9px;"
                      src="../assets/doc/folder.png"
                      width="30px"
                      height="30px"
                    />
                    <img
                      v-else-if="scope.row.Suffix=='.docx'"
                      style="position: absolute;top:9px;"
                      src="../assets/doc/docx.png"
                      width="30px"
                      height="30px"
                    />
                    <img
                      v-else-if="scope.row.Suffix=='.xlsx'"
                      style="position: absolute;top:9px;"
                      src="../assets/doc/xlsx.png"
                      width="30px"
                      height="30px"
                    />
                    <img
                      v-else-if="scope.row.Suffix=='.pdf'"
                      style="position: absolute;top:9px;"
                      src="../assets/doc/pdf.png"
                      width="30px"
                      height="30px"
                    />
                    <img
                      v-else-if="scope.row.Suffix=='.ppt'"
                      style="position: absolute;top:9px;"
                      src="../assets/doc/ppt.png"
                      width="30px"
                      height="30px"
                    />
                    <img
                      v-else-if="scope.row.Suffix=='.txt'"
                      style="position: absolute;top:9px;"
                      src="../assets/doc/txt.png"
                      width="30px"
                      height="30px"
                    />
                    <img
                      v-else-if="scope.row.Suffix=='.zip'"
                      style="position: absolute;top:9px;"
                      src="../assets/doc/zip.png"
                      width="30px"
                      height="30px"
                    />
                    <img
                      v-else
                      style="position: absolute;top:9px;"
                      src="../assets/doc/other.png"
                      width="30px"
                      height="30px"
                    />
                    <label style="margin-left:40px;width:100px;">
                      <label style="display:none;">
                        <el-input size="mini" v-model="currInputVal" :value="scope.row.Name"></el-input>
                        <span class="newFolder-border" @click="createNewfolder">
                          <i class="el-icon-check" />
                        </span>
                        <span class="newFolder-border" @click="cancelCreateNewfolder(scope.row)">
                          <i class="el-icon-close" />
                        </span>
                      </label>
                      <label>{{scope.row.Name}}</label>
                    </label>
                    <label style="position: absolute;right:40px;display:none;color:#409eff">
                      <!-- <label style="margin:0px 5px;">分享</label> -->
                      
                      <label
                      style="margin:0px 5px;cursor:pointer"
                      @click="dialogVisible = true"
                      >
                      <i class="el-icon-share"></i>分享
                      </label>

                      <label
                        style="margin:0px 5px;cursor:pointer"
                        @click.stop="deleteDocumentFolder(scope.row)"
                      >
                        <i class="el-icon-delete"></i> 删除
                      </label>
                      <label
                        style="margin:0px 5px;cursor:pointer"
                        @click.stop="downLoad(scope.row)"
                      >
                        <i class="el-icon-download"></i> 下载
                      </label>
                    </label>
                  </template>
                </el-table-column>
                <el-table-column prop="ChangeSize" sortable label="大小" width="200">
                  <template slot-scope="scope">
                    <label v-if="!scope.row.Size">--</label>
                    <label v-else>{{ scope.row.ChangeSize}}</label>
                  </template>
                </el-table-column>
                <el-table-column prop="DisplayName" label="创建者" width="120"></el-table-column>
                <el-table-column prop="DataYMDHMSStr" sortable label="日期" width="200">
                  <template slot-scope="scope">{{ scope.row.DataYMDHMSStr }}</template>
                </el-table-column>
              </el-table>
              <el-dialog
  title="分享"
  :visible.sync="dialogVisible"
  width="40%"
  :before-close="handleClose">
  <span>{{sharecomment}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
            </uploader-drop>
            <uploader-list v-if="showList"></uploader-list>
          </uploader>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
var n = 0
var query = {
  currentNode: 0, // 当前节点
  guid: '',
  wjjName: '', // 文件夹名称
  size: 0
}
export default {
  name: 'Document',
  data () {
    return {
      currSelection: [], // 当前check多选集合
      isAddFolder: false,
      currInputVal: '',
      sharecomment:'这是一条链接',
      currCell: '', // 当前选中的“行列”元素
      currRow: {}, // 当前选中行数据
      tableHeight: 0, // table自适应高度
      positionP: false, // 创建文件夹input是否显示
      topHeight: 128, // 创建文件夹input 距离顶部的高度
      dialogVisible: false,
      // 上传文件 start
      autoStart: true,
      file: '',
      fileStatusText: {
        success: '成功',
        error: '失败',
        uploading: '上传中',
        paused: '暂停',
        waiting: '等待'
      },
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: 'api/Document/UploadFile',
        chunkSize: '2048000', // 分块大小
        fileParameterName: 'file', // 上传文件时文件的参数名，默认file
        maxChunkRetries: 3, // 最大自动失败重试上传次数
        testChunks: false, // 是否开启服务器分片校验
        withCredentials: true, // 当跨域请求时发送cookie
        initialPaused: true,
        generateUniqueIdentifier: function () {
          return '嘎嘎'
        },
        query: function (e) {
          n++
          if (query.wjjName !== '') {
            e.name = e.relativePath.split('/')[1] + '.part' + n
          } else {
            e.name = e.relativePath + '.part' + n // 这里不能用e.name + '.part' + n，否则api报错：指定的路径或文件名太长,或者两者都太长。完全限定文件名必须少
          }
          return {
            currentNode: query.currentNode,
            guid: query.guid,
            fileName1: e.relativePath,
            fileName2: query.fileName,
            wjjName: query.wjjName,
            size: e.size
          }
        },
        headers: {
          // 请求头携带参数
          Authorization: localStorage.eleToken
        },
        parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
          return parsedTimeRemaining
            .replace(/\syears?/, '年')
            .replace(/\days?/, '天')
            .replace(/\shours?/, '小时')
            .replace(/\sminutes?/, '分钟')
            .replace(/\sseconds?/, '秒')
        }
      },
      attrs: {
        accept: 'image/*'
      },
      showList: false,
      uploadFileList: [],
      // 上传文件 end

      currselectfolder: {}, // 当前选中文件夹
      folderBreadcrumb: [], // 文件夹面包屑
      seen: true,
      treeData: [], // 树形结构数据
      // 树形结构自定义属性名称
      defaultProps: {
        id: 'ID',
        children: 'Document_FolderList',
        label: 'Name'
      },
      // 表格数据
      tableData: [],
      multipleSelection: []
      
    }
    
  },
  created () {
    // this.autoStart = false    //初始化时设置属性有效
    this.aaa()
    query.guid = this.guid()
    this.GetDocumentFolderListById()

    // 获取可拖拽上传区域 #drop 的高度
    setTimeout(() => {
      document.getElementById('app-container').addEventListener('click', () => {
        console.log(this.isAddFolder)
        if (this.currCell && !this.isAddFolder) {
          this.currCell.firstChild.childNodes[1].firstChild.style.display =
            'none'
          this.currCell.firstChild.childNodes[1].lastChild.style.display =
            'inline'
        }
      })

      var dropH = document.getElementById('drop')
      this.tableHeight = dropH.offsetHeight - 120
    }, 1)
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    handleCurrentChange (row, column, cell, event) {
      this.currRow = row
      console.log('当前选中：' + JSON.stringify(row))
      // 先清除check
      this.$refs.multipleTable.clearSelection()
      // 再将选中行勾选check
      this.$refs.multipleTable.toggleRowSelection(row)
      this.currSelection = []
      this.currSelection.push(row)// 加入到check集合中
      console.log(this.isAddFolder)
      if (this.isAddFolder) {
        // eslint-disable-next-line eqeqeq
        if (row != this.tableData[0]) {
          this.isAddFolder = false
        }
      }

    },
    
  
    cellClick (row, column, cell, event) {
      event.stopPropagation() // 阻止时间冒泡（也就是阻止全局点击事件触发）
      if (cell.firstChild._prevClass === 'cell' || this.isAddFolder) {
        // this.isAddFolder = false;
        // 防止点击其它列是报错
        return
      }
      if (this.currCell === cell) {
        console.log(cell.firstChild.childNodes[1].firstChild.childNodes)
        this.showRowInputEdit(cell, row.Name)
      } else {
        if (this.currCell) {
          this.hideRowInputEdit()
        }
      }
      this.currCell = cell
    },

    // 显示行input编辑框
    showRowInputEdit (cell, folderName) {
      cell.firstChild.childNodes[1].firstChild.childNodes[0].style.width =
        '200px' // 获取input元素，设置宽度（目前用普通的方法设置宽度都无效）
      // cell.firstChild.childNodes[1].firstChild.childNodes[3].style.fontSize="24px";
      this.currInputVal = folderName // 赋值编辑的input
      cell.firstChild.childNodes[1].firstChild.style.width = '10px'
      cell.firstChild.childNodes[1].firstChild.style.display = 'inline'
      cell.firstChild.childNodes[1].lastChild.style.display = 'none'
    },
    // 隐藏行input编辑框
    hideRowInputEdit (type) {
      if (type) {
        // 新增文件夹时的“隐藏”操作
        var cell = this.$refs.multipleTable.$el.childNodes[2].firstChild
          .lastChild.firstChild.childNodes[1] // 获取第一行dom元素
        console.log(cell.firstChild.childNodes[1].firstChild)
        cell.firstChild.childNodes[1].firstChild.style.display = 'none'
        cell.firstChild.childNodes[1].lastChild.style.display = 'inline'
      } else {
        // 编辑文件名称时的“隐藏”操作
        this.currCell.firstChild.childNodes[1].firstChild.style.display =
          'none'
        this.currCell.firstChild.childNodes[1].lastChild.style.display =
          'inline'
      }
    },

    createNewfolder (event) {
      event.stopPropagation() // 阻止时间冒泡（也就是阻止全局点击事件触发）
      console.log(this.isAddFolder)
      if (!this.isAddFolder) {
        this.currRow.Name = this.currInputVal
        let type = 1
        if (this.currRow.FolderID > 0) {
          console.log('修改文件夹')
          type = 0 // 修改文件夹
        }
        this.$axios
          .get(
            `/api/Document/UpdateDocumentFolder?type=${type}&&id=${this.currRow.ID}&&name=${this.currInputVal}`
          )
          .then(res => {
            if ((type === 1)) {
              // 修改文件
              this.hideRowInputEdit()
            } else {
              // 修改文件夹啊
              this.hideRowInputEdit(true)
            }
          })
      } else {
        console.log('添加文件夹')
        var last = this.folderBreadcrumb.slice(-1)
        let parentFolderID = last[0].ID
        console.log(this.currInputVal)
        if (!this.currInputVal) {
          this.currInputVal = this.$refs.input.value
        }
        console.log(this.currInputVal)
        this.$axios
          .get(
            `/api/Document/AddDocumentFolder?parentFolderID=${parentFolderID}&&name=${this.currInputVal}`
          )
          .then(res => {
            this.currInputVal = '' // 清空input
            // this.tableData[0] = res; //这样赋值，在异步操作里面无效
            this.tableData.shift() // 所以先移除第一个
            this.tableData.unshift(res) // 再将添加的文件返回插入到第一个
            console.log(this.tableData)
            this.hideRowInputEdit(true)
            this.positionP = false
            // 添加到当前文件夹下面

            console.log(res)
            res.Document_FolderList = [] /// /防止出错
            res.Document_VersionInfoList = [] // 防止出错
            this.currselectfolder.Document_FolderList.unshift(res)
            // this.GetDocumentFolderListById();
          })
      }
    },

    // 获取所有文件夹和文件
    GetDocumentFolderListById () {
      this.$axios.get(`/api/Document/GetDocumentFolderListById`).then(res => {
        this.folderBreadcrumb.push(res)
        this.treeData = res.Document_FolderList
        this.tableData = res.Document_FolderList.concat(
          res.Document_VersionInfoList
        )
        // 当前文件夹
        this.currselectfolder = res
        var last = this.folderBreadcrumb.slice(-1)
        query.currentNode = last[0].ID
      })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    select (selection, row) {
      console.log(selection)
      console.log(row)
      this.currSelection = selection
    },
    // 删除选中文件（夹）
    deleteDocumentFolder (row) {
      // 鼠标悬浮”删除“按钮操作
      if (row.ID) {
        this.tableData = this.tableData.filter(item => {
          // eslint-disable-next-line eqeqeq
          return item != row
        })
      }
      // 勾选check，删除按钮操作
      if (this.currSelection.length > 0) {
        // 可在axios成功回调里面写前端删除
        this.currSelection.forEach(val => {
          this.tableData = this.tableData.filter(item => {
            // eslint-disable-next-line eqeqeq
            return item != val
          })
        })
        this.currSelection = []// 清空
        // this.$axios
        //   .post(`/api/Document/DeleteDocumentFolder`, this.currSelection)
        //   .then(res => {
        //     console.log("删除成功");
        //   })
        //   .catch(err => {
        //   });
      }
    },
    cellDblclick (data) {
      // if (data == this.currselectfolder) {
      //   return;
      // }
      this.currselectfolder = data
      if (data.Document_FolderList) {
        this.folderBreadcrumb.push(data)
        this.tableData = data.Document_FolderList.concat(
          data.Document_VersionInfoList
        )
      }
      // 当前文件夹id
      query.currentNode = data.ID
    },
    handleNodeClick (data, node, a) {
      console.log('上一级：' + JSON.stringify(this.folderBreadcrumb))
      // 返回上一级
      if (data === 0) {
        var o = this.folderBreadcrumb.length - 1
        // splice方法，删除返回新数组
        if (o > 0) {
          // 排除数组的第一组值“文档管理”
          this.folderBreadcrumb.splice(o, 1)
        }
        var last = this.folderBreadcrumb.slice(-1)
        this.tableData = last[0].Document_FolderList.concat(
          last[0].Document_VersionInfoList
        )
        // 当前文件夹id
        query.currentNode = last[0].ID
        return
      }
      // 查询当前文件夹在所有文件夹数组中的索引
      var indexof = this.folderBreadcrumb.indexOf(data)
      var one = parseInt(indexof + 1)
      // 要删除的数量
      var two = parseInt(this.folderBreadcrumb.length - indexof)
      // splice方法，删除返回新数组
      this.folderBreadcrumb.splice(one, two)
      this.tableData = data.Document_FolderList.concat(
        data.Document_VersionInfoList
      )

      // 当前文件夹id
      query.currentNode = data.ID
    },
    // 鼠标划入展示
    enter () {
      this.seen = true
    },
    // 鼠标移除隐藏
    leave () {
      this.seen = false
    },

    aaa () {
      this.autoStart = true
    },
    // 添加单个文件调用的方法（如果添加的是一个文件夹，该文件夹下面的文件也会一个个执行这个方法）
    fileadded (file) {
      // 上传文件显示uploader-list
      this.showList = true
      query.size = file.size
      query.fileName = file.name
      // file.removeFile(file)
      // this.autoStart = false //在事件里面设置属性无效
      console.log('单个')
      this.uploadFileList.push(file)
      setTimeout(() => {
        // 如果属性autoStart设置的是false,则调用resume()继续上传方法，提示是“等待”状态，即使先调用pause()暂停方法，再接着调用resume()方法也提示等待“状态”；
        // 此时解决方法有两种：1.直接设置autoStart为true;2.先调用pause()，然后 setTimeout(() => {file.resume()},1)
        // 将resume()方法放在setTimeout里面调用，使其异步即可
        // file.resume()
      }, 1)
    },
    fileremoved (file) {
      console.log(this.uploadFileList)
      this.showList = false
    },
    // 批量添加文件的方法,也就是上传文件夹（如果上传的是文件，不管是一个文件还是多个文件，都只会执行一次这个方法）
    filesadded (files, fileList) {
      console.log(fileList)
      if (fileList.length > 0) {
        if (fileList[0].isFolder) {
          query.wjjName = fileList[0].name // 获取文件夹名称
        }
      }
      console.log('批量')
    },
    // 每个文件上传成功之后的回调函数
    fileSuccess (rootFile, file, message, chunk) {
      var myDate = new Date()
      console.log(rootFile)
      console.log(file)
      // 每个文件上传成功之后显示前端的数据字段
      var successFile = {}
      successFile.Name = file.relativePath
      successFile.Size = file.size
      successFile.ChangeSize = file.size / 1024 + 'kb'
      successFile.DisplayName = '超级管理员'
      successFile.DataYMDHMSStr = myDate.toLocaleString()
      successFile.Suffix = '.' + file.relativePath.split('.').slice(-1)[0]
      // 添加至第一行
      this.tableData.unshift(successFile)
    },
    // 一个文件在上传中
    fileProgress (rootFile, file, chunk) {
      // console.log(chunk.xhr.status)
    },
    // 一个根文件成功上传完成
    fileComplete (rootFile) {
      console.log(rootFile.name + '上传完成')
      const uploaderInstance = this.$refs.uploader.uploader
      if (uploaderInstance.getSize() === uploaderInstance.sizeUploaded()) {
        console.log('所有文件上传成功')
        // 删除分块文件
        // delete(query.guid)
      }
    },
    guid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
        c
      ) {
        var r = (Math.random() * 16) | 0
        var v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    },
    // eslint-disable-next-line camelcase
    toTree (data, parent_id) {
      var tree = []
      var temp
      for (var i = 0; i < data.length; i++) {
        // eslint-disable-next-line camelcase
        if (data[i].ID === parent_id) {
          var obj = data[i]
          temp = this.toTree(data, data[i].id)
          if (temp.length > 0) {
            obj.Document_FolderList = temp
          }
          tree.push(obj)
        }
      }
      return tree
    },

    // var a = document.getElementById("dom");
    //   del_space(a); //清理空格
    //   var b = a.childNodes; //获取a的全部子节点；
    //   var c = a.parentNode; //获取a的父节点；
    //   var d = a.nextSibling; //获取a的下一个兄弟节点
    //   var e = a.previousSibling; //获取a的上一个兄弟节点
    //   var f = a.firstChild; //获取a的第一个子节点
    //   var g = a.lastChild; //获取a的最后一个子节点
    // 鼠标移入行
    cellMouseEnter (row, column, cell, event) {
      // 显示操作条  找一个特殊的条件判断，否则影响其他元素
      // console.log(cell.firstChild.className.trim());
      if (cell.firstChild.className.trim() === 'cell el-tooltip') {
        cell.firstChild.lastChild.style.display = 'inline'
      }
    },
    cellMouseLeave (row, column, cell, event) {
      // 隐藏操作条
      if (cell.firstChild.className.trim() === 'cell el-tooltip') {
        cell.firstChild.lastChild.style.display = 'none'
      }
    },
    // 下载文件
    downLoad (row) {
      // 文件下载
      if (row.Path) {
        console.log('文件下载')
        window.location.href = `/api/Login/DownLoad?filePath=${row.Path}&fileName=${row.Name}`
      } else {
        // 文件夹下载
        console.log('文件夹下载')
      }
    }
  }
}
</script>

<style scoped>
.el-input__inner {
  width: 30px !important;
}

.leftTree {
  padding: 10px;
  height: 100%;
  overflow: auto;
  /* background:#303542f2; */
  border: 2px solid #ebeef5;
  border-radius: 10px;
  /* color: #FFFFFF; */
}
.el-tree {
  /* height: calc(100% + 20px); */
  margin-top: 10px;
}
.el-tree >>> .el-tree-node__content:hover {
  background: #62a8ea;
  color: #ffffff;
  border-radius: 2px;
}
/* 选中父级菜单，自己菜单的背景色 */
/* .el-tree--highlight-current .el-tree-node.is-current{
    background:yellow
} */
.el-tree
  >>> .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background: #409eff;
  color: #ffffff;
  border-radius: 2px;
}
.el-tree >>> .el-tree-node:focus > .el-tree-node__content {
  background: #409eff;
  color: #ffffff;
  border-radius: 2px;
}
.el-tree >>> .el-tree-node__content > .el-checkbox {
  margin-right: 0px;
}
.el-tree >>> .el-tree-node__content > .el-tree-node__expand-icon {
  padding: 0px;
}
span {
  margin-left: 3px !important;
}

.folderBreadcrumb {
  font-weight: 600;
  font-size: 18px;
}
.kd {
  color: #409eff;
  /* color: #242D47; */
  cursor: pointer;
}
/* .folderBreadcrumb:hover {
  color: #409eff;
} */
.folderBreadcrumb > i {
  margin: 0px 5px;
  font-weight: 700;
}
/* 上传文件 */
.uploaderDiv,
.uploaderDiv p {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* color: #C83647; */
}
.uploaderDiv,
.uploader-example {
  /* height: calc(100% - 20px); */
  height: 100%;
}
.uploader-example .uploader-btn {
  width: 60px;
  padding: 5px 17px;
  line-height: 30px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  color: #409eff;
  background-color: #ecf5ff;
  /* border:1px silod #b3d8ff; */
  position: absolute;
  z-index: 999;
  right: 118px;
  border-radius: 5px;
}
.uploader-btn {
  border: 1px solid #b3d8ff !important;
}
.uploader-btn:hover {
  background: #409eff;
  /* background-color: rgb(36, 45, 71); */
  font-weight: 700;
  color: #ffffff;
}
.uploader-example .uploader-list {
  width: 600px;
  max-height: 440px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  right: 20px;
  bottom: 20px;
}
.uploader-drop {
  border-radius: 10px;
  height: calc(100% - 22px);
  background-color: #ffffff;
}

.newFolder {
  /* left: 30px; */
  position: absolute;
  background: #ffffff;
  margin-left: 105px;
}
.newFolder-input {
  width: 200px;
  height: 20px;
  border: 1px solid #c3eaff;
  font-size: 13px;
  color: #606266;
}
.newFolder-border {
  display: inline-block;
  width: 24px;
  /* height: 24px; */
  border: 2px solid #daebfe;
  text-align: center;
  color: #101010;
  background-color: #ebeef5;
  font-weight: 700;
}
.newFolder-border:hover {
  background: #409eff;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
}

#drop >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #ecf5ff !important;
}
</style>
