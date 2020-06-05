class RemoveCommentsPlugin{
    apply(compiler){
        compiler.hooks.emit.tap("RemoveCommentsPlugin",compilation=>{
            //compilation 打包的上下文
            for(const name in compilation.assets){
                if(name.endsWith(".js")){
                    const contents = compilation.assets[name].source()
                    const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
                    compilation.assets[name] = {
                        source: () => noComments,
                        size: () => noComments.length
                    }
                }
            }
        })
    }
}