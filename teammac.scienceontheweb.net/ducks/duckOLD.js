var do_only_once = 0;

		jQuery(document).ready(function(){
				var add = 0;
                var speed = 10000;
                var gameStatus = 0;
                var vertDict = [30, 40, 50, 20, 30, 50, 10];
                var horDict = [50, 10, 20, 90, 70, 80, 30];
		var currentTarget = -1; // Used for focusing on one duck. -1 means no target

				function game_over(){
                    gameStatus = 0;
		            currentTarget = -1; // Used for focusing on one duck. -1 means no target
					jQuery('.duck').stop().animate({'top':'70%'},300);
					// jQuery('.scorezone').html('GAME OVER');
                    jQuery('#scorezone').append('<div class="try_again">TRY AGAIN</div>');
				}
	
				function start(){
                    gameStatus = 1;
					add = 0;
                    speed = 10000;
                    jQuery('.scorezone').html('Score: ' + add);
                    duckFlight('.duck')
					// jQuery('.duck').animate({'top':'0%'},speed, function(){
					// 	game_over();
					// 	jQuery('.try_again').click(function(){start();});
					// });
				}

				// jQuery('.duck').hover(function(){
                //     jQuery(this).css('background-image','url(hurt.png)');
                    
				// 	jQuery(this).stop().animate({'top':'100%'},300, function(){
				// 		add++;
				// 		jQuery('.scorezone').html('Score: ' + add);
                //         jQuery(this).css('background-image','url(duck.png)');
                        
				// 		jQuery(this).animate({'top':'0%'},5000, function(){
				// 			game_over();
				// 			jQuery('.try_again').click(function(){start();});
				// 		});
				// 	});
                // });
                function duckImage(duckNum, num, vertPrev, horPrev, vert, hor){
                    
                    if(horPrev >= hor){
                        if(vertPrev < vert){
                            $(duckNum).css({'background-image':'url(duck' + num + '.png)', 'transform':'scale(-1,1)'}, function(){
                                $(duckNum).delay(400).css({'background-image':'url(duck' + (num + 1) + '.png)', 'transform':'scale(-1,1)'}, function(){
                                    $(duckNum).delay(400).css({'background-image':'url(duck' + (num + 2) + '.png)', 'transform':'scale(-1,1)'}, function(){

                                    });
                                });
                            });
                        }
                        if(vertPrev >= vert){
                            $(duckNum).css({'background-image':'url(duck' + (num + 3) + '.png)', 'transform':'scale(-1,1)'}, function(){
                                $(duckNum).delay(400).css({'background-image':'url(duck' + (num + 4) + '.png)', 'transform':'scale(-1,1)'}, function(){
                                    $(duckNum).delay(400).css({'background-image':'url(duck' + (num + 5) + '.png)', 'transform':'scale(-1,1)'}, function(){

                                    });
                                });
                            });
                        }
                    }
                    if(horPrev < hor){
                        if(vertPrev < vert){
                            $(duckNum).css({'background-image':'url(duck' + num + '.png)'}, function(){
                                $(duckNum).delay(400).css({'background-image':'url(duck' + (num + 1) + '.png)'}, function(){
                                    $(duckNum).delay(400).css({'background-image':'url(duck' + (num + 2) + '.png)'}, function(){

                                    });
                                });
                            });
                        }
                        if(vertPrev >= vert){
                            $(duckNum).css({'background-image':'url(duck' + (num + 3) + '.png)'}, function(){
                                $(duckNum).delay(400).css({'background-image':'url(duck' + (num + 4) + '.png)'}, function(){
                                    $(duckNum).delay(400).css({'background-image':'url(duck' + (num + 5) + '.png)'}, function(){

                                    });
                                });
                            });
                        }
                    }
                }
                function duckFlight(duckNum) {
                    var vertical = vertDict;
                    var horizontal = horDict;
                    $(duckNum).animate({'top':vertical[0]+'%', 'left':horizontal[0]+'%'},1200, function(){
                        duckImage(duckNum, 1, vertical[0], horizontal[0], vertical[1], horizontal[1]);
                        $(duckNum).animate({'top':vertical[1]+'%', 'left':horizontal[1]+'%'},1200, function(){
                            duckImage(duckNum, 1, vertical[0], horizontal[0], vertical[1], horizontal[1]);
                            $(duckNum).animate({'top':vertical[2]+'%', 'left':horizontal[2]+'%'},1200, function(){
                                duckImage(duckNum, 1, vertical[1], horizontal[1], vertical[2], horizontal[2]);
                                $(duckNum).animate({'top':vertical[3]+'%', 'left':horizontal[3]+'%'},1200, function(){
                                    duckImage(duckNum, 1, vertical[2], horizontal[2], vertical[3], horizontal[3]);
                                    $(duckNum).animate({'top':vertical[4]+'%', 'left':horizontal[4]+'%'},1200, function(){
                                        duckImage(duckNum, 1, vertical[3], horizontal[3], vertical[4], horizontal[4]);
                                        $(duckNum).animate({'top':vertical[5]+'%', 'left':horizontal[5]+'%'},1200, function(){
                                            duckImage(duckNum, 1, vertical[4], horizontal[4], vertical[5], horizontal[5]);
                                            $(duckNum).animate({'top':vertical[6]+'%', 'left':horizontal[6]+'%'},1200, function(){
                                                duckImage(duckNum, 1, vertical[5], horizontal[5], vertical[6], horizontal[6]);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                
                
                function wack(duckNum) {
                    $(duckNum).css('background-image','url(duck7.png)');
                    $(duckNum).stop().animate({'top':'70%'},300, function(){

                        add++;
                        $('.scorezone').html('Score: ' + add);
                        $(duckNum).css('background-image','url(duck1.png)');
                        $(duckNum).animate({'top':'0%'},speed, function(){
                            game_over();
                            jQuery('.try_again').click(function(){start();});
                        });
                    });
                    if(speed > 500){
                        speed = speed - 200;
                    }
			        currentTarget = -1;
                }

                // make letteres red up to word cursor amount in wordArray word
                // pass in duck number 0-2 eg duck1=0, duck2=1, duck3=2
                function changeRed(n){
                    domMod[n] = "";
                    for(var a = 0; a < wordArray[n].length; a++){
                        if(a < wordCursor[n]){
                            domMod[n] += '<span style="color: red;">' + wordArray[n].charAt(a) + '</span>';
                        }
                        else{
                            domMod[n] += wordArray[n].charAt(a);
                        }
                    }
                    word[n].innerHTML = domMod[n];
                }

                var word = [document.getElementById("word1"), document.getElementById("word2"), document.getElementById("word3")];
                var domMod = ["", "", ""];
                var dictionary = ["a;", "gh", "ty", "ru", "ei", "wo", "qp", "bn", "vm", "c,", "x.", "zz"];
                var wordArray = ["fj", "dk", "sl"];
                var keyArray = [102, 100, 115]; //f,d,s
                var wordCursor = [0,0,0];
                // fill keyArray with initial word array, TODO load word array from dictionary
                for(i = 0; i < 3; i++){
                    keyArray[i] = wordArray[i].charCodeAt(wordCursor[i]);
                }

                // key event listener, TODO implement typo feature to clear word progress (red letters)
                $(document).keypress(function(e) {
                    if(gameStatus == 1){
                        if(e.which == 13) {
                            // enter pressed
                        }
                        if(e.which == keyArray[0] && (currentTarget == -1 || currentTarget == 0)) {
			                currentTarget = 0
                            wordCursor[0]++;
                            changeRed(0);
                            if(wordCursor[0] >= wordArray[0].length){
                                wordCursor[0] = 0;
                                wack("#duck1");
                                dictionary.push(wordArray[0]);
                                wordArray[0] = dictionary.shift();
                                word[0].innerHTML = wordArray[0];
                            }
                            keyArray[0] = wordArray[0].charCodeAt(wordCursor[0]);
                        }
                        if(e.which == keyArray[1] && (currentTarget == -1 || currentTarget == 1)) {
			                currentTarget = 1;
                            wordCursor[1]++;
                            changeRed(1);
                            if(wordCursor[1] >= wordArray[1].length){
                                wordCursor[1] = 0;
                                wack("#duck2");
                                dictionary.push(wordArray[1]);
                                wordArray[1] = dictionary.shift();
                                word[1].innerHTML = wordArray[1];
                            }
                            keyArray[1] = wordArray[1].charCodeAt(wordCursor[1]);
                        }
                        if(e.which == keyArray[2] && (currentTarget == -1 || currentTarget == 2)) {
			                currentTarget = 2;
                            wordCursor[2]++;
                            changeRed(2);
                            if(wordCursor[2] >= wordArray[2].length){
                                wordCursor[2] = 0;
                                wack("#duck3");
                                dictionary.push(wordArray[2]);
                                wordArray[2] = dictionary.shift();
                                word[2].innerHTML = wordArray[2];
                            }
                            keyArray[2] = wordArray[2].charCodeAt(wordCursor[2]);
                        }
                    }
                    $("#"+String.fromCharCode(e.which)).css({fill:"red", transition:"1.0s"});
                    $("#"+String.fromCharCode(e.which)).animate({'fill':'red'}, 1000, function(){
                        $("#"+String.fromCharCode(e.which)).css({fill:"#efefee", transition:"1.0s"});
                    });
                });
            // start game when page loads
			if (do_only_once == 0){
                do_only_once = 1;
                start();
			}
		});
