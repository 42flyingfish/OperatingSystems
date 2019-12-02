var do_only_once = 0;

		jQuery(document).ready(function(){
				var add = 0;
			        var level = 0;
                var speed = 10000;

				function game_over(){
					jQuery('.mole').stop().animate({'top':'70%'},300);
					// jQuery('.scorezone').html('GAME OVER');
					jQuery('#scorezone').append('<div class="try_again">TRY AGAIN</div>');
				}
	
				function start(){
					add = 0;
                    speed = 10000;
					jQuery('.scorezone').html('Score: ' + add);
					jQuery('.mole').animate({'top':'0%'},speed, function(){
						game_over();
						jQuery('.try_again').click(function(){start();});
					});
				}

				// jQuery('.mole').hover(function(){
                //     jQuery(this).css('background-image','url(hurt.bmp)');
                    
				// 	jQuery(this).stop().animate({'top':'100%'},300, function(){
				// 		add++;
				// 		jQuery('.scorezone').html('Score: ' + add);
                //         jQuery(this).css('background-image','url(mole.bmp)');
                        
				// 		jQuery(this).animate({'top':'0%'},5000, function(){
				// 			game_over();
				// 			jQuery('.try_again').click(function(){start();});
				// 		});
				// 	});
                // });
                
                function wack(moleNum) {
                    $(moleNum).css('background-image','url(hurt.bmp)');
                    $(moleNum).stop().animate({'top':'70%'},300, function(){

                        add++;
			levelUP(add, level);
                        $('.scorezone').html('Score: ' + add);
                        $(moleNum).css('background-image','url(mole.bmp)');
                        $(moleNum).animate({'top':'0%'},speed, function(){
                            game_over();
                            jQuery('.try_again').click(function(){start();});
                        });
                    });
                    if(speed > 500){
                        speed = speed - 200;
                    }
                }
		function levelUP(score, level) {
			if (level < 1 && score >= 20) {
				dictionary.push.apply(dictionary, dictLen3);
			}
		}

                // make letteres red up to word cursor amount in wordArray word
                // pass in mole number 0-2 eg mole1=0, mole2=1, mole3=2
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
                const dictLen3 = ["cat", "dog", "bee", "zip", "bat"];
                var wordArray = ["fj", "dk", "sl"];
                var keyArray = [102, 100, 115]; //f,d,s
                var wordCursor = [0,0,0];
                // fill keyArray with initial word array, TODO load word array from dictionary
                for(i = 0; i < 3; i++){
                    keyArray[i] = wordArray[i].charCodeAt(wordCursor[i]);
                }

                // key event listener, TODO implement typo feature to clear word progress (red letters)
                $(document).keypress(function(e) {
                    if(e.which == 13) {
                        // enter pressed
                    }
                    if(e.which == keyArray[0]) {
                        wordCursor[0]++;
                        changeRed(0);
                        if(wordCursor[0] >= wordArray[0].length){
                            wordCursor[0] = 0;
                            wack("#mole1");
                            dictionary.push(wordArray[0]);
                            wordArray[0] = dictionary.shift();
                            word[0].innerHTML = wordArray[0];
                        }
                        keyArray[0] = wordArray[0].charCodeAt(wordCursor[0]);
                    }
                    if(e.which == keyArray[1]) {
                        wordCursor[1]++;
                        changeRed(1);
                        if(wordCursor[1] >= wordArray[1].length){
                            wordCursor[1] = 0;
                            wack("#mole2");
                            dictionary.push(wordArray[1]);
                            wordArray[1] = dictionary.shift();
                            word[1].innerHTML = wordArray[1];
                        }
                        keyArray[1] = wordArray[1].charCodeAt(wordCursor[1]);
                    }
                    if(e.which == keyArray[2]) {
                        wordCursor[2]++;
                        changeRed(2);
                        if(wordCursor[2] >= wordArray[2].length){
                            wordCursor[2] = 0;
                            wack("#mole3");
                            dictionary.push(wordArray[2]);
                            wordArray[2] = dictionary.shift();
                            word[2].innerHTML = wordArray[2];
                        }
                        keyArray[2] = wordArray[2].charCodeAt(wordCursor[2]);
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
