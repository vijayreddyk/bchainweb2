

$(document).ready(function(){

    $('.main').each(function(){  
        
        // Cache the highest
        var highestBox = 0;
        
        // Select and loop the elements you want to equalise
        $('.view-heading', this).each(function(){
          
          // If this box is higher than the cached highest then store it
          if($(this).height() > highestBox) {
            highestBox = $(this).height();
            console.log(highestBox);
          }
        
        });  
              
        // Set the height of all those children to whichever was highest 
        $('.view-heading',this).height(highestBox);
                      
      }); 
     $('.main').each(function(){  
         
         // Cache the highest
         var highestBox = 0;
         
         // Select and loop the elements you want to equalise
         $('.view-value', this).each(function(){
           
           // If this box is higher than the cached highest then store it
           if($(this).height() > highestBox) {
             highestBox = $(this).height(); 
           }
         
         });  
               
         // Set the height of all those children to whichever was highest 
         $('.view-value',this).height(highestBox);
                       
       }); 
    
});
