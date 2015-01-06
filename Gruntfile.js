'use strict';
module.exports = function (grunt) {
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	var banner = (function() {/*
                                                                                  
      ;Sr;siS5s,       .rrs;i        ;XGGXr     .s9&G2:                             
      ;@@@M5XH@@@r   .#2h;;:@B&.   s@@3rrh@@:  M@@s;i#@@                            
       3@@     @@@  &h@      rA@. .@@5     A, h@@     :h                            
       X@@   r@@A  i3#        @3#  @@@Br,     r@@@X;.                               
       2@@AHM@@B:  ,G9        ,Ah   i@@@@@@#,   h@@@@@@3                            
       2@@     A@@. #93       ,#2,      :3@@@      .;#@@@                           
       S@@     ;@@2 :@S.      @5S 3@      ,@@,@2      M@#                           
       @@@hrs5B@@&   ,MA&,,rS3h   :@@9:,,s@@, X@@s:,:9@A                            
      ,s;;539Xs.       .Srri;       ,59h3i      ;X932;                                                                                                                                       
	*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];


	// Configurable paths
	var config = {
		src : 'src',
		proto : 'proto',
		dist : 'dist',
		test : 'test',
		pkg : grunt.file.readJSON('package.json'),
		connect : {
			port : 9000,
			// Change this to '0.0.0.0' to access the server from outside
			hostname : 'localhost'
		},
		banner : '/*!' + banner + '\n' + 
			'* <%= config.pkg.name %> - v<%= config.pkg.version %>-\n' + 
			'<%= config.pkg.homepage ?  "* " + config.pkg.homepage + "\\n" : "" %>' + 
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= config.pkg.author.name %> (<%= config.pkg.author.homepage %>) */\n'
	};

	// Define the configuration for all tasks
	grunt.initConfig({
		// Project settings
		config : config,

		// Empties folders to start fresh
		// 清空目录下的文件
		clean : {
			dist : {
				files : [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/*',
						'!<%= config.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		// JS语法规则校验
		jshint : {
			options: {
				jshintrc: 'jshint.jshintrc',
				globals : {
					jQuery : true,
					console : true,
					module : true,
					document : true,
					IX : true
				},
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= config.src %>/js/{,*/}*.js',
				'!<%= config.src %>/js/common/ixutils.js',
				'!<%= config.src %>/js/pymatch/pymatch.js',
				'!<%= config.src %>/js/route/page.route.js',
				'!<%= config.src %>/js/vendor/*',
				'test/spec/{,*/}*.js'
			]
		},

		// Watches files for changes and runs tasks based on the changed files
		// 监听文件变化
		watch : {
			bower : {
				files: ['bower.json'],
				tasks : ['wiredep']
			},
			js : {
				files : ['<%= config.src %>/js/{,*/}*.js', '<%= config.src %>/test.js'],
				tasks : ['jshint'],
				options : {
					livereload : true
				}
			},
			jstest : {
				files : ['test/spec/{,*/}*.js'],
				tasks : ['test:watch']
			},
			gruntfile : {
				files : ['Gruntfile.js']
			},
			less : {
				files : ['<%= config.src %>/css/{,*/}*.less'],
				tasks : ['less']
			},
			css : {
				files : ['<%= config.src %>/css/{,*/}*.css'],
				tasks : ['newer:copy:css']
			},
			livereload : {
				options : {
					livereload : '<%= connect.options.livereload %>'
				},
				files : [
					'<%= config.src %>/{,*/}*.html',
					'.tmp/css/{,*/}*.*',
					'<%= config.src %>/img/{,*/}*',
					'<%= config.src %>/../test/data/{,*/}*'
				]
			}
		},

		// Automatically inject Bower components into the HTML file
		// 自动插入Bower依赖
		wiredep : {
			app: {
				ignorePath : /^\/|\.\.\//,
				src : ['<%= config.src %>/index.html'],
				exclude : [
					// 'bower_components/jquery/dist/jquery.js',
					'bower_components/intel-appframework/appframework.min.js',
					'bower_components/requirejs/require.js',
					'bower_components/bootstrap/dist/js/bootstrap.js',
					'bower_components/bootstrap/dist/css/bootstrap.css',
					'bower_components/zeptojs/dist/zepto.js',
					'bower_components/amazeui/dist/css/amazeui.css',
					'bower_components/amazeui/dist/js/amazeui.js',
					'bower_components/amazeui/dist/js/amazeui.widgets.helper.js',
					'bower_components/echarts/build/dist/echarts-all.js'
					// 'bower_components/underscore/underscore.js'
				]
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent : {
			server : [
				'less',
				'copy:css'
			],
			test : [
				'less',
				'copy:css'
			],
			dist : [
				'less',
				'copy:css',
				'imagemin',
				'svgmin'
			]
		},

		// The actual grunt server settings
		connect : {
			options : {
				port : '<%= config.connect.port %>',
				open : true,
				livereload : 35729,
				hostname : '<%= config.connect.hostname %>'
			},
			livereload : {
				options : {
					middleware : function (connect) {
						return [
							connect.static('.tmp'),
							connect().use('/bower_components', connect.static('./bower_components')),
							connect().use('/test', connect.static('./test')),
							connect.static(config.src)
						];
					}
				}
			},
			test : {
				options : {
					open : false,
					port : 9001,
					middleware : function (connect) {
						return [
							connect.static('.tmp'),
							connect.static('test'),
							connect().use('/bower_components', connect.static('./bower_components')),
							connect.static(config.src)
						];
					}
				}
			},
			dist : {
				options : {
					base : '<%= config.dist %>',
					livereload : false
				}
			}
		},

		// Copies remaining files to places other tasks can use
		copy : {
			dist : {
				files : [
					{
						expand : true,
						dot : true,
						cwd : '<%= config.src %>',
						dest : '<%= config.dist %>',
						src : [
							'*.{ico,png,txt}',
							'img/{,*/}*.webp',
							'{,*/}*.html',
							'font/{,*/}*.*'
						]
					},
					{
						src : 'node_modules/apache-server-configs/dist/.htaccess',
						dest : '<%= config.dist %>/.htaccess'
					},
					{
						expand : true,
						dot : true,
						cwd : 'bower_components/ratchet/dist',
						src : 'fonts/*',
						dest : '<%= config.dist %>'
					}
				]
			},
			css : {
				expand : true,
				dot : true,
				cwd : '<%= config.src %>/css',
				dest : '.tmp/css',
				src : '{,*/}*.css'

			}
		},

		// Compile Less file
		less : {
			options : {
				report : 'min'
			},
			compile : {
				files : {
					"<%= config.src %>/css/core.css" : "<%= config.src %>/css/core.less"
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files, Creates configurations in memory so 
		// additional tasks can operate on them
		// usemin初始化
		useminPrepare : {
			options : {
				dest : '<%= config.dist %>'
			},
			html : '<%= config.src %>/index.html'
		},

		usemin : {
			options : {
				assetsDirs : [
					'<%= config.dist %>',
					'<%= config.dist %>/img',
					'<%= config.dist %>/css'
				]
			},
			html : ['<%= config.dist %>/{,*/}*.html'],
			css : ['<%= config.dist %>/css/{,*/}*.css']
		},

		// The following *-min tasks produce minified files in the dist folder
		// 压缩图片
		imagemin : {
			dist : {
				files : [{
					expand : true,
					cwd : '<%= config.src %>/img',
					src : '{,*/}*.{gif,jpeg,jpg,png}',
					dest : '<%= config.dist %>/img'
				}]
			}
		},

		// 压缩svg
		svgmin : {
			dist : {
				files : [{
					expand : true,
					cwd : '<%= config.src %>/img',
					src : '{,*/}*.svg',
					dest : '<%= config.dist %>/img'
				}]
			}
		},

		// 压缩html
		htmlmin : {
			dist : {
				options : {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files : [{
					expand : true,
					cwd : '<%= config.dist %>',
					src : '{,*/}*.html',
					dest : '<%= config.dist %>'
				}]
			}
		},

		// Renames files for browser caching purposes
		rev : {
			dist : {
				files : {
					src : [
						'<%= config.dist %>/js/{,*/}*.js',
						'<%= config.dist %>/css/{,*/}*.css',
						'<%= config.dist %>/img/{,*/}*.*',
						'<%= config.dist %>/fonts/{,*/}*.*',
						'<%= config.dist %>/*.{ico,png}'
					]
				}
			}
		},

		// @TODO For next version to user it
		// requirejs : {
		// 	build : {
		// 		options : {
		// 			"baseUrl": "<%= config.src %>/js",
		// 			"dir" : "<%= config.dist %>/js",
		// 			"modules" : [
		// 			],
		// 			"paths" : {
		// 				"_" : "../../bower_components/underscore/underscore"
		// 			},
		// 			"optimizeCss" : "standard",
		// 			"removeCombined" : false
		// 		}
		// 	}
		// },

		// Preproces HTML files by using tags depending on current grunt target
		// 对HTML文件，根据grunt target 进行预处理
		targethtml : {
			dist : {
				files : {
					'<%=config.dist %>/index.html' : '<%=config.dist %>/index.html'
				}
			},
			dev : {
				files : {
					'.tmp/index.html' : '<%=config.src %>/index.html'
				}
			},
			mu : {
				files : {
					'<%=config.dist %>/index.html' : '<%=config.dist %>/index.html'
				}
			},
			dohko : {
				files : {
					'<%=config.dist %>/index.html' : '<%=config.dist %>/index.html'
				}
			}
		}

	});


	// 为了开发调试本地前端原型
	// 启动HTTP Server
	// 可以通过为命令传递参数，指定预览开发模式下的代码，还是预览发布后代码
	// grunt [cmd]:[arg]
	// ex:
	// grunt serve[:dist]
	grunt.registerTask('serve', 'Start the server and preview your app, --allow-remote for remote access', function (target) {
		if (grunt.option('allow-remote')) {
			grunt.config.set('connect.options.hostname', '0.0.0.0');
		}
		if (target === 'dist' || target === 'mu' || target === 'dohko') {
			// 预览发布后代码
			// 执行grunt任务队列，先进行代码发布工作，再启动服务器
			// @TODO
			return grunt.task.run(['build' + ':' + target, 'connect:dist:keepalive']);
		}
		// 预览开发代码
		// 执行grunt任务队列
		// 1.清空临时缓存目录
		// 2.加载bower依赖
		// 3.加载发布并发处理
		// 4.启动服务器
		// 5.启动文件监听
		// @TODO
		grunt.task.run([
			'clean:server',
			'targethtml:dev',
			'wiredep',
			'concurrent:server',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', function (target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run([target? ('serve:' + target) : 'serve']);
	});

	// 进行单元测试
	// 可以通过为命令传递参数，指定单元测试模式
	// grunt [cmd]:[arg]
	// ex:
	// grunt test[:watch]
	grunt.registerTask('test', 'Start the server and run unit test for your app', function (target) {
		if (target !== 'watch') {
			// @TODO
			grunt.task.run([
				'clean:server',
				'concurrent:test'
			]);
		}
		grunt.task.run([
			'connect:test',
			'mocha'
		]);
	});

	// 对工程进行发布
	// @TODO
	// grunt.registerTask('build', [
	// 	// 清空发布目录
	// 	'clean:dist',
	// 	// 加载bower依赖
	// 	'wiredep',
	// 	// 批量压缩预处理任务
	// 	'useminPrepare',
	// 	// 加载并发处理，缩短发布时间
	// 	'concurrent:dist',
	// 	// 合并文件
	// 	'concat',
	// 	// 压缩css文件
	// 	'cssmin',
	// 	// 压缩脚本
	// 	'uglify',
	// 	// 拷贝资源文件
	// 	'copy:dist',
	// 	// 'requirejs',
	// 	// 为引用文件增加md5时间戳
	// 	'rev',
	// 	// 执行usemin任务
	// 	'usemin',
	// 	'htmlmin'
	// ]);

	// grunt.registerTask('build', function () {
	// 	grunt.task.run([
	// 		// 清空发布目录
	// 		'clean:dist',
	// 		// 加载bower依赖
	// 		'wiredep',
	// 		// 批量压缩预处理任务
	// 		'useminPrepare',
	// 		// 加载并发处理，缩短发布时间
	// 		'concurrent:dist',
	// 		// 合并文件
	// 		'concat',
	// 		// 压缩css文件
	// 		'cssmin',
	// 		// 压缩脚本
	// 		'uglify',
	// 		// 拷贝资源文件
	// 		'copy:dist',
	// 		// 'requirejs',
	// 		// 为引用文件增加md5时间戳
	// 		'rev',
	// 		// 执行usemin任务
	// 		'usemin',
	// 		'targethtml:dist',
	// 		'htmlmin'
	// 	]);
	// });

	grunt.registerTask('build', function (target) {
		var htmlTarget = '';
		if (target == 'mu') {
			htmlTarget = target;
		} else if (target == 'dohko') {
			htmlTarget = target;
		} else {
			htmlTarget = 'dist';
		}
		grunt.task.run([
			// 清空发布目录
			'clean:dist',
			// 加载bower依赖
			'wiredep',
			// 批量压缩预处理任务
			'useminPrepare',
			// 加载并发处理，缩短发布时间
			'concurrent:dist',
			// 合并文件
			'concat',
			// 压缩css文件
			'cssmin',
			// 压缩脚本
			'uglify',
			// 拷贝资源文件
			'copy:dist',
			// 'requirejs',
			// 为引用文件增加md5时间戳
			'rev',
			// 执行usemin任务
			'usemin',
			'targethtml:' + htmlTarget,
			// 'htmlmin'
		]);
	});



















};