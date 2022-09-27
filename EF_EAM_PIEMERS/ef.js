/* V01 11.6 AUTHOR : Herve LOYER
* Copyright (c) INFOR Global Solutions.*/
Ext.define ('EAM.custom.external_WSWREQ', {
    extend: 'EAM.custom.AbstractExtensibleFramework',
    getSelectors: function() {
        return {

        // Tab HDR 
        '[extensibleFramework][tabName=HDR]':{
           // afterlayout (pēc ekrāna ielādes)
            afterlayout : function () {
                if (EAM.Utils.getScreen().userFunction=='WSWREQ'&&!EAM.Utils.getScreen().isScreenDesigner) {
                    console.log ('WSWREQ afterlayout');
                    priorityColor();
                }; // end if userFunction
            }, // end afterlayout
        
            // afterrecordchange (pēc Priority vērtības izmaiņas)
              afterrecordchange : function (field, lastValues) {
                    console.log ('WSWREQ afterrecordchange');
                    priorityColor();
            }, // end afterrecordchange

        },  // end HDR

        // atrodoties lauciņā 'priority' un izmainot tā vērtību
            'uxform[tabName=HDR] [name=priority]': {
                blur:function() {
                priorityColor();
            }, // end blur
        }, // end HDR priority
        } //return
        } // getSelectors
    }); // Ext.define

    function priorityColor() {
        try {
        var vPriority=Ext.ComponentQuery.query ('[name=priority]')[0].getValue();
            Ext.ComponentQuery.query ('[name=priority]')[0].inputEl.dom.style.backgroundColor='transparent';
        if (vPriority=='B' || vPriority=='C')
            {Ext.ComponentQuery.query ('[name-priority]')[0].inputEl.dom.style.backgroundColor='#F78181';
            console.log ('B vai C');};
        if (vPriority=='A' || vPriority=='*')
            {Ext.ComponentQuery.query ('[name=priority]')[0].inputEl.dom.style.backgroundColor='#ff9999'};
        }
        catch (err) {};
    } // end priorityColor f.