$(document).ready(function(){
    //var cardsContainer = $('#cards-div');
    //for(var i =1;i<=3;i++){
    //    cardsContainer.append()
    //}


    var nuberOfCards = 18;
    var n=nuberOfCards/2;

    //creating unique card array from image names
    var cardsArray = [];
    for(var i=1;i<=n;i++){
        cardsArray.push('anime'+i);
    }

    //twicing the array
    for(var j=0;j<n;j++){
        cardsArray.push(cardsArray[j]);
    }

    //shuffle the array
    function shuffle(randomArray){
        for(var k = randomArray.length-1; k>0; k--){
            var g = Math.floor(Math.random()*(k+1));
            var temp = randomArray[k];
            randomArray[k] = randomArray[g];
            randomArray[g] = temp;
        }
        return randomArray;
    };
    var cardsArray = shuffle(cardsArray);
    console.log(cardsArray);

    var cardsContainer = $('#cards-div');
    for(var s=0; s<cardsArray.length; s++){
        cardsContainer.append('<div class="col-md-2"><img src="images/cover.jpg" class="img-responsive picture" data-name="'+cardsArray[s]+'.jpg"></div>');
    }

    var clickedCount = 0;
    var countOpenCards = 0;

    $('body').delegate('img','click',function(){

        if($(this).hasClass('active') || $(this).hasClass('opened')){
            console.log('try another card');
        }
        else {
            function openCard(card){
                var imgName = card.attr('data-name');
                card.attr('src','images/'+imgName);
                card.addClass('active');
                clickedCount++;
                console.log(clickedCount);
            }

            var checked = false;

            function checkCard(card){
                var imgName = card.attr('data-name');
                card.attr('src','images/'+imgName);
                var activeCard = $('.active');

                if(activeCard.attr('src') == card.attr('src')){
                    activeCard.removeClass('active').addClass('opened');
                    card.addClass('opened');
                    countOpenCards++;
                } else {
                    function imgChange(){
                        activeCard.removeClass('active');
                        activeCard.attr('src','images/cover.jpg');
                        card.attr('src','images/cover.jpg');
                    }
                    setTimeout(imgChange, 600);
                }
                clickedCount = 0;
                console.log(clickedCount);

                checked = true;
            }


            if(clickedCount == 0){
                openCard($(this));
            } else {
                checkCard($(this));

                if(checked && countOpenCards == (nuberOfCards/2)){
                    setTimeout(function(){
                        var answer =  confirm('you are win. do you want to start again?');
                        if(answer == true){
                            location.reload();
                        }
                    }, 700);

                }
            }


        }


    });
});