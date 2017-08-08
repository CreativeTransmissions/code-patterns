
// Add all event handlers inside one function which runs on page load
function addEventHandlers(){

    // Keep element variables local if possible to prevent side effects such as conflicts with other scripts
    var primaryPanel = $('.panel-primary')[0];

    var exampleVar = 'An example variable outside of handler';

    /*  Only add events to element classes like .add-room instead of ids so the code is more reusable.
     *  Add event handlers with this form of jQuery 'on' so all future .add-room elements inside the primary panel will recieve the handler when they are created
     */

    $(primaryPanel).on('click','.add-room',function(){

        /* Use an anonymous function as the 3rd parameter of .on('click')
         * dont do anything here except call a function, so keeps code clean
         * this way also means we can easily pass in variables to the handler function */

        clickAddRoom(this, exampleVar);

    });

};

addEventHandlers();

function clickAddRoom(el, exampleVar){
    // el is 'this' from the event

   // use jquery closest to search up the dom and get a reference to closest element that contains everything we need to interact with
    var furniturePanel = $(el).closest('.panel-body');

    // use jquery find to get everything we need that is inside the container:
    
    // get the tab nav 
    var roomsTabNav = $(furniturePanel).find('.rooms-tab-nav').first();

    //get the content div
    var roomsTabContent = $(furniturePanel).find('.rooms-tab-content').first();

    // get the furniture list
    var listFurniture = $(furniturePanel).find('select.furniture-categories');

    // get values from dom
    var uniqueId = new Date().getTime();
    var selectedCat = listFurniture.find('option:selected');
    var categoryId = selectedCat.val();
    var categoryName = selectedCat.text();
    var furnitureItems = selectedCat.data('furnitures');
  
    // Split any big chunks of code into separate functions
    var htmlContent = buildRoomTabHTML(uniqueId, categoryId, categoryName, furnitureItems);

    // Update UI
    $(roomsTabNav).append('<li><a href=#'+ uniqueId +' data-toggle="tab" data-category-id="'+categoryId+'"><span>'+categoryName+'<span></li>');
    $(roomsTabContent).append(htmlContent);
    $(roomsTabNav).find('li>a').last().click();        
}