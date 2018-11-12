if (typeof(UserAgentInfo) != 'undefined' && !window.addEventListener) 
{ 
    UserAgentInfo.strBrowser=1; 
} 

var startDateRange;
var endDateRange;
var startDateRangeHoliday;
var endDateRangeHoliday;
var renderStartDate;
var addSiteValue;
var availableField;
var addHolidayValue;
var itemHolidayID;
var itemID;
var months = new Array(12);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";
var renderMonthTdHTML = "";
var SiteUrl = "";
var splitVal = [];
var deliveryNoteSpliting = [];
var cylScanSpliting = [];
var scmSpliting = [];
var qBotSpliting = [];
var iBotSpliting = [];
var datalakeSpliting = [];
var rpaSpliting = [];
var ioTSpliting = [];
var enterprisePortalSpliting = [];
var agencySpliting=[];
var allProjectsSpliting=[];
var onLeaveSpliting=[];
var newSiteValue = "";
var newDateFieldRange = [];
var deliveryNoteDataField = [];
var cylScanDataField = [];
var scmDataField = [];
var qBotDataField = [];
var iBotDataField = [];
var datalakeDataField = [];
var rpaDataField = [];
var ioTDataField = [];
var enterprisePortalDataField = [];
var agencyDataField= [];
var allProjectsDataField= [];
var onLeaveDataField= [];

var arrayCompareResultdeliveryNote=[];
var arrayCompareResultcylScan = [];
var arrayCompareResultscm =[];
var arrayCompareResultqBot = [];
var arrayCompareResultiBot = [];
var arrayCompareResultdatalake = [];
var arrayCompareResultrpa = [];
var arrayCompareResultioT = [];
var arrayCompareResultenterprisePortal = [];
var arrayCompareResultAgency=[];
var arrayCompareResultAllProjects=[];
var arrayCompareResultOnleave=[];

var newDateField = "";
var siteMainUrl = _spPageContextInfo.webAbsoluteUrl;
var addFieldValue = "";
var addRoleValue = "";
var lkaddRoleValue;
var lkaddFieldValue;
var addFieldValueText = "";
var dateFilter = "";
var dateSpliting = [];
var month_value;
var monthField;
var yearField;
var stringDate = "";
var modal;
var singaporeHolidaySpliting = [];
var fujairahHolidayDataSpliting = [];
var indiaHolidayDataSpliting = [];
var singaporeHolidayDataField = [];
var fuzariahHolidayDataField = [];
var indiaHolidayDataField = [];
var newDateFieldRange = [];
var arrayCompareResultSingaporeHoliday = [];
var arrayCompareResultFuzariahHoliday = [];
var arrayCompareResultIndiaHoliday= [];
var modalHoliday;
var modalMilestone;
var modalEditMilestone;
var mile_month;
var mile_year;
var mileEditMonth;
var mileEditYear;
var counting=1;
$(document).ready(function() {
    SP.SOD.executeFunc('SP.js', 'SP.ClientContext', function() {
        modalMilestone = document.getElementById('milestoneModal');
        //$("#bg_blocking_layer").show();
		
		
        $(".dataClass").hide();
        var a = loadlist();
        a.done(function() {
            var b = loadrolelist();
            b.done(function() {
                var c = renderDataColorCodes();
                c.done(function() {
                    var d=renderHolidayCodes();
					
					d.done(function() {
						var e=loadNamesSearchMilelist();
						e.done(function() {
							loadRender();
						});
					});
                });
            });
        });
        //renderColorCodes();

        SiteUrl = _spPageContextInfo.webServerRelativeUrl;

        $('input[name="datefilter"]').dateRangePicker({
            showWeekNumbers: true,
            singleMonth: true,
            showShortcuts: false,
            format: 'MM/DD/YYYY',
            showTopbar: false

        }).bind('datepicker-change', function(evt, obj) {
          // onChange();
        });

        $('#startpicker').datepicker({
			 beforeShow: function(input) {
                $(input).datepicker('widget').removeClass('hide-calendar');
	
            },
            onSelect: function(dateText, inst) {
                var date = $(this).datepicker('getDate');
                mile_month = date.getMonth() + 1;
                mile_year = date.getFullYear();

            }
        });
        $('#endpicker').datepicker({
			 beforeShow: function(input) {
                $(input).datepicker('widget').removeClass('hide-calendar');
	
            }
		});
        $('.datepickerInput').datepicker({
            changeMonth: true,
            changeYear: true,
            showWeek: true,
            showButtonPanel: true,
            dateFormat: 'MM yy',
            beforeShow: function(input) {
                $(input).datepicker('widget').addClass('hide-calendar');
                if ((selDate = $(this).val()).length > 0) {
                    var iYear = selDate.substring(selDate.length - 4, selDate.length);
                    var iMonth = jQuery.inArray(selDate.substring(0, selDate.length - 5), $(this).datepicker('option', 'monthNames'));
                    $(this).datepicker('option', 'defaultDate', new Date(iYear, iMonth, 1));
                    $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
                }
            },

            onClose: renderTable
        });
		
		$('.datepickerMileInput').datepicker({
            changeMonth: true,
            changeYear: true,
            showWeek: true,
            showButtonPanel: true,
            dateFormat: 'MM yy',
            beforeShow: function(input) {
                $(input).datepicker('widget').addClass('hide-calendar');
                if ((selDate = $(this).val()).length > 0) {
                    var iYear = selDate.substring(selDate.length - 4, selDate.length);
                    var iMonth = jQuery.inArray(selDate.substring(0, selDate.length - 5), $(this).datepicker('option', 'monthNames'));
                    $(this).datepicker('option', 'defaultDate', new Date(iYear, iMonth, 1));
                    $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
                }
				
            },
			onClose:function(dateText, inst){
				
				$(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
				onChange();
				 
			}
			
           
        });
        
        

        $(".imageClass").click(function(e) {
			counting=counting+1;
			
            $(".dataClass").toggle();
			if(counting%2==0){
			$(".headingTag").css("width", 1494);
			}
			else{
				
				$(".headingTag").css("width", "100%");
			}
            e.preventDefault();
        });
        $(".applyDiv").click(function(e) {
            $(".holidayClass").toggle();
            e.preventDefault();
        });
        $('.milestoneTitleDiv').click(function(e) {
            $('.milestoneToggle').toggle();
            e.preventDefault();
        })
        $(".AddDescription").click(function() {


            descriptionData = $('.descriptionData').val();
            if (descriptionData != "" && descriptionData != " ") {
                modalDescription.style.display = "none";
                dataHolidaySubmit(descriptionData);
            } else {
                alert("Please enter description");
            }
        });



        $(".milestoneDiv").click(function() {

            
                mileDesc = $('#descText').val('');
                mileComment = $('#commentText').val('');
                mileStart = $('#startpicker').val('');
                mileEnd = $('#endpicker').val('');
                mileStatus = $("#status").val('ChooseStatus');

                modalMilestone.style.display = "block";
                loadStatuslist();
                loadNamesMilelist();
                loadRolesMilelist();
                loadProjectMilelist();
             

        });
        $(".mileCancel").click(function() {
            modalMilestone.style.display = "none";


        });
        $(".mileEditCancel").click(function() {
            modalEditMilestone.style.display = "none";


        });

        $(".alertYes").click(function() {

            modal.style.display = "none";
            $("#bg_blocking_layer").show();

            if (addSiteValue == "Delivery Note") {
                if (arrayCompareResultcylScan.length > 0) {
                    cylScanDataField = changingValueForSite(cylScanSpliting, newDateFieldRange);
                }
                if (arrayCompareResultscm.length > 0) {
                    scmDataField = changingValueForSite(scmSpliting, newDateFieldRange);
                }
                if (arrayCompareResultqBot.length > 0) {
                    qBotDataField = changingValueForSite(qBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultiBot.length > 0) {
                    iBotDataField = changingValueForSite(iBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    datalakeDataField = changingValueForSite(datalakeSpliting, newDateFieldRange);
                }
                if (arrayCompareResultrpa.length > 0) {
                    rpaDataField = changingValueForSite(rpaSpliting, newDateFieldRange);
                }
                if (arrayCompareResultioT.length > 0) {
                    ioTDataField = changingValueForSite(ioTSpliting, newDateFieldRange);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    enterprisePortalDataField = changingValueForSite(enterprisePortalSpliting, newDateFieldRange);
                }
				if (arrayCompareResultAgency.length > 0) {
                    agencyDataField = changingValueForSite(agencySpliting, newDateFieldRange);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    allProjectsDataField = changingValueForSite(allProjectsSpliting, newDateFieldRange);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    onLeaveDataField = changingValueForSite(onLeaveSpliting, newDateFieldRange);
                }
				
                if (splitVal[0] != "" && splitVal[0] != "null") {
                    for (var j = 0; j < deliveryNoteSpliting.length; j++) {


                        newDateFieldRange.push(deliveryNoteSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);


            }
            if (addSiteValue == "CylScan") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    deliveryNoteDataField = changingValueForSite(deliveryNoteSpliting, newDateFieldRange);
                }
                if (arrayCompareResultscm.length > 0) {
                    scmDataField = changingValueForSite(scmSpliting, newDateFieldRange);
                }
                if (arrayCompareResultqBot.length > 0) {
                    qBotDataField = changingValueForSite(qBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultiBot.length > 0) {
                    iBotDataField = changingValueForSite(iBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    datalakeDataField = changingValueForSite(datalakeSpliting, newDateFieldRange);
                }
                if (arrayCompareResultrpa.length > 0) {
                    rpaDataField = changingValueForSite(rpaSpliting, newDateFieldRange);
                }
                if (arrayCompareResultioT.length > 0) {
                    ioTDataField = changingValueForSite(ioTSpliting, newDateFieldRange);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    enterprisePortalDataField = changingValueForSite(enterprisePortalSpliting, newDateFieldRange);
                }
				if (arrayCompareResultAgency.length > 0) {
                    agencyDataField = changingValueForSite(agencySpliting, newDateFieldRange);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    allProjectsDataField = changingValueForSite(allProjectsSpliting, newDateFieldRange);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    onLeaveDataField = changingValueForSite(onLeaveSpliting, newDateFieldRange);
                }
                if (splitVal[1] != "" && splitVal[1] != "null") {
                    for (var j = 0; j < cylScanSpliting.length; j++) {


                        newDateFieldRange.push(cylScanSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);

            }
            if (addSiteValue == "SCM FM") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    deliveryNoteDataField = changingValueForSite(deliveryNoteSpliting, newDateFieldRange);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    cylScanDataField = changingValueForSite(cylScanSpliting, newDateFieldRange);
                }
                if (arrayCompareResultqBot.length > 0) {
                    qBotDataField = changingValueForSite(qBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultiBot.length > 0) {
                    iBotDataField = changingValueForSite(iBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    datalakeDataField = changingValueForSite(datalakeSpliting, newDateFieldRange);
                }
                if (arrayCompareResultrpa.length > 0) {
                    rpaDataField = changingValueForSite(rpaSpliting, newDateFieldRange);
                }
                if (arrayCompareResultioT.length > 0) {
                    ioTDataField = changingValueForSite(ioTSpliting, newDateFieldRange);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    enterprisePortalDataField = changingValueForSite(enterprisePortalSpliting, newDateFieldRange);
                }
				if (arrayCompareResultAgency.length > 0) {
                    agencyDataField = changingValueForSite(agencySpliting, newDateFieldRange);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    allProjectsDataField = changingValueForSite(allProjectsSpliting, newDateFieldRange);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    onLeaveDataField = changingValueForSite(onLeaveSpliting, newDateFieldRange);
                }
                if (splitVal[2] != "" && splitVal[2] != "null") {
                    for (var j = 0; j < scmSpliting.length; j++) {


                        newDateFieldRange.push(scmSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);

            }

            if (addSiteValue == "QBot") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    deliveryNoteDataField = changingValueForSite(deliveryNoteSpliting, newDateFieldRange);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    cylScanDataField = changingValueForSite(cylScanSpliting, newDateFieldRange);
                }
                if (arrayCompareResultscm.length > 0) {
                    scmDataField = changingValueForSite(scmSpliting, newDateFieldRange);
                }
                if (arrayCompareResultiBot.length > 0) {
                    iBotDataField = changingValueForSite(iBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    datalakeDataField = changingValueForSite(datalakeSpliting, newDateFieldRange);
                }
                if (arrayCompareResultrpa.length > 0) {
                    rpaDataField = changingValueForSite(rpaSpliting, newDateFieldRange);
                }
                if (arrayCompareResultioT.length > 0) {
                    ioTDataField = changingValueForSite(ioTSpliting, newDateFieldRange);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    enterprisePortalDataField = changingValueForSite(enterprisePortalSpliting, newDateFieldRange);
                }
				if (arrayCompareResultAgency.length > 0) {
                    agencyDataField = changingValueForSite(agencySpliting, newDateFieldRange);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    allProjectsDataField = changingValueForSite(allProjectsSpliting, newDateFieldRange);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    onLeaveDataField = changingValueForSite(onLeaveSpliting, newDateFieldRange);
                }
                if (splitVal[3] != "" && splitVal[3] != "null") {
                    for (var j = 0; j < qBotSpliting.length; j++) {


                        newDateFieldRange.push(qBotSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField)

            }
            if (addSiteValue == "IBot") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    deliveryNoteDataField = changingValueForSite(deliveryNoteSpliting, newDateFieldRange);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    cylScanDataField = changingValueForSite(cylScanSpliting, newDateFieldRange);
                }
                if (arrayCompareResultscm.length > 0) {
                    scmDataField = changingValueForSite(scmSpliting, newDateFieldRange);
                }
                if (arrayCompareResultqBot.length > 0) {
                    qBotDataField = changingValueForSite(qBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    datalakeDataField = changingValueForSite(datalakeSpliting, newDateFieldRange);
                }
                if (arrayCompareResultrpa.length > 0) {
                    rpaDataField = changingValueForSite(rpaSpliting, newDateFieldRange);
                }
                if (arrayCompareResultioT.length > 0) {
                    ioTDataField = changingValueForSite(ioTSpliting, newDateFieldRange);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    enterprisePortalDataField = changingValueForSite(enterprisePortalSpliting, newDateFieldRange);
                }
				if (arrayCompareResultAgency.length > 0) {
                    agencyDataField = changingValueForSite(agencySpliting, newDateFieldRange);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    allProjectsDataField = changingValueForSite(allProjectsSpliting, newDateFieldRange);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    onLeaveDataField = changingValueForSite(onLeaveSpliting, newDateFieldRange);
                }
                if (splitVal[4] != "" && splitVal[4] != "null") {
                    for (var j = 0; j < iBotSpliting.length; j++) {


                        newDateFieldRange.push(iBotSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);

            }
            if (addSiteValue == "DataLake") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    deliveryNoteDataField = changingValueForSite(deliveryNoteSpliting, newDateFieldRange);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    cylScanDataField = changingValueForSite(cylScanSpliting, newDateFieldRange);
                }
                if (arrayCompareResultscm.length > 0) {
                    scmDataField = changingValueForSite(scmSpliting, newDateFieldRange);
                }
                if (arrayCompareResultqBot.length > 0) {
                    qBotDataField = changingValueForSite(qBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultiBot.length > 0) {
                    iBotDataField = changingValueForSite(iBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultrpa.length > 0) {
                    rpaDataField = changingValueForSite(rpaSpliting, newDateFieldRange);
                }
                if (arrayCompareResultioT.length > 0) {
                    ioTDataField = changingValueForSite(ioTSpliting, newDateFieldRange);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    enterprisePortalDataField = changingValueForSite(enterprisePortalSpliting, newDateFieldRange);
                }
				if (arrayCompareResultAgency.length > 0) {
                    agencyDataField = changingValueForSite(agencySpliting, newDateFieldRange);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    allProjectsDataField = changingValueForSite(allProjectsSpliting, newDateFieldRange);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    onLeaveDataField = changingValueForSite(onLeaveSpliting, newDateFieldRange);
                }
                if (splitVal[5] != "" && splitVal[5] != "null") {
                    for (var j = 0; j < datalakeSpliting.length; j++) {


                        newDateFieldRange.push(datalakeSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);

            }
            if (addSiteValue == "RPA") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    deliveryNoteDataField = changingValueForSite(deliveryNoteSpliting, newDateFieldRange);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    cylScanDataField = changingValueForSite(cylScanSpliting, newDateFieldRange);
                }
                if (arrayCompareResultscm.length > 0) {
                    scmDataField = changingValueForSite(scmSpliting, newDateFieldRange);
                }
                if (arrayCompareResultqBot.length > 0) {
                    qBotDataField = changingValueForSite(qBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultiBot.length > 0) {
                    iBotDataField = changingValueForSite(iBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    datalakeDataField = changingValueForSite(datalakeSpliting, newDateFieldRange);
                }
                if (arrayCompareResultioT.length > 0) {
                    ioTDataField = changingValueForSite(ioTSpliting, newDateFieldRange);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    enterprisePortalDataField = changingValueForSite(enterprisePortalSpliting, newDateFieldRange);
                }
				if (arrayCompareResultAgency.length > 0) {
                    agencyDataField = changingValueForSite(agencySpliting, newDateFieldRange);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    allProjectsDataField = changingValueForSite(allProjectsSpliting, newDateFieldRange);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    onLeaveDataField = changingValueForSite(onLeaveSpliting, newDateFieldRange);
                }
                if (splitVal[6] != "" && splitVal[6] != "null") {
                    for (var j = 0; j < rpaSpliting.length; j++) {


                        newDateFieldRange.push(rpaSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);

            }
            if (addSiteValue == "IoT") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    deliveryNoteDataField = changingValueForSite(deliveryNoteSpliting, newDateFieldRange);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    cylScanDataField = changingValueForSite(cylScanSpliting, newDateFieldRange);
                }
                if (arrayCompareResultscm.length > 0) {
                    scmDataField = changingValueForSite(scmSpliting, newDateFieldRange);
                }
                if (arrayCompareResultqBot.length > 0) {
                    qBotDataField = changingValueForSite(qBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultiBot.length > 0) {
                    iBotDataField = changingValueForSite(iBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    datalakeDataField = changingValueForSite(datalakeSpliting, newDateFieldRange);
                }
                if (arrayCompareResultrpa.length > 0) {
                    rpaDataField = changingValueForSite(rpaSpliting, newDateFieldRange);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    enterprisePortalDataField = changingValueForSite(enterprisePortalSpliting, newDateFieldRange);
                }
				if (arrayCompareResultAgency.length > 0) {
                    agencyDataField = changingValueForSite(agencySpliting, newDateFieldRange);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    allProjectsDataField = changingValueForSite(allProjectsSpliting, newDateFieldRange);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    onLeaveDataField = changingValueForSite(onLeaveSpliting, newDateFieldRange);
                }
                if (splitVal[7] != "" && splitVal[7] != "null") {
                    for (var j = 0; j < ioTSpliting.length; j++) {


                        newDateFieldRange.push(ioTSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);

            }
            if (addSiteValue == "Enterprise Portal") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    deliveryNoteDataField = changingValueForSite(deliveryNoteSpliting, newDateFieldRange);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    cylScanDataField = changingValueForSite(cylScanSpliting, newDateFieldRange);
                }
                if (arrayCompareResultscm.length > 0) {
                    scmDataField = changingValueForSite(scmSpliting, newDateFieldRange);
                }
                if (arrayCompareResultqBot.length > 0) {
                    qBotDataField = changingValueForSite(qBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultiBot.length > 0) {
                    iBotDataField = changingValueForSite(iBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    datalakeDataField = changingValueForSite(datalakeSpliting, newDateFieldRange);
                }
                if (arrayCompareResultrpa.length > 0) {
                    rpaDataField = changingValueForSite(rpaSpliting, newDateFieldRange);
                }
                if (arrayCompareResultioT.length > 0) {
                    ioTDataField = changingValueForSite(ioTSpliting, newDateFieldRange);
                }
				if (arrayCompareResultAgency.length > 0) {
                    agencyDataField = changingValueForSite(agencySpliting, newDateFieldRange);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    allProjectsDataField = changingValueForSite(allProjectsSpliting, newDateFieldRange);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    onLeaveDataField = changingValueForSite(onLeaveSpliting, newDateFieldRange);
                }
                if (splitVal[8] != "" && splitVal[8] != "null") {
                    for (var j = 0; j < enterprisePortalSpliting.length; j++) {


                        newDateFieldRange.push(enterprisePortalSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);

            }
			if (addSiteValue == "Agency") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    deliveryNoteDataField = changingValueForSite(deliveryNoteSpliting, newDateFieldRange);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    cylScanDataField = changingValueForSite(cylScanSpliting, newDateFieldRange);
                }
                if (arrayCompareResultscm.length > 0) {
                    scmDataField = changingValueForSite(scmSpliting, newDateFieldRange);
                }
                if (arrayCompareResultqBot.length > 0) {
                    qBotDataField = changingValueForSite(qBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultiBot.length > 0) {
                    iBotDataField = changingValueForSite(iBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    datalakeDataField = changingValueForSite(datalakeSpliting, newDateFieldRange);
                }
                if (arrayCompareResultrpa.length > 0) {
                    rpaDataField = changingValueForSite(rpaSpliting, newDateFieldRange);
                }
                if (arrayCompareResultioT.length > 0) {
                    ioTDataField = changingValueForSite(ioTSpliting, newDateFieldRange);
                }
				 if (arrayCompareResultenterprisePortal.length > 0) {
                    enterprisePortalDataField = changingValueForSite(enterprisePortalSpliting, newDateFieldRange);
                }
				
				if (arrayCompareResultAllProjects.length > 0) {
                    allProjectsDataField = changingValueForSite(allProjectsSpliting, newDateFieldRange);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    onLeaveDataField = changingValueForSite(onLeaveSpliting, newDateFieldRange);
                }
                if (splitVal[9] != "" && splitVal[9] != "null") {
                    for (var j = 0; j < agencySpliting.length; j++) {


                        newDateFieldRange.push(agencySpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);

            }
			if (addSiteValue == "All Projects") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    deliveryNoteDataField = changingValueForSite(deliveryNoteSpliting, newDateFieldRange);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    cylScanDataField = changingValueForSite(cylScanSpliting, newDateFieldRange);
                }
                if (arrayCompareResultscm.length > 0) {
                    scmDataField = changingValueForSite(scmSpliting, newDateFieldRange);
                }
                if (arrayCompareResultqBot.length > 0) {
                    qBotDataField = changingValueForSite(qBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultiBot.length > 0) {
                    iBotDataField = changingValueForSite(iBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    datalakeDataField = changingValueForSite(datalakeSpliting, newDateFieldRange);
                }
                if (arrayCompareResultrpa.length > 0) {
                    rpaDataField = changingValueForSite(rpaSpliting, newDateFieldRange);
                }
                if (arrayCompareResultioT.length > 0) {
                    ioTDataField = changingValueForSite(ioTSpliting, newDateFieldRange);
                }
				 if (arrayCompareResultenterprisePortal.length > 0) {
                    enterprisePortalDataField = changingValueForSite(enterprisePortalSpliting, newDateFieldRange);
                }
				if (arrayCompareResultAgency.length > 0) {
                    enterprisePortalDataField = changingValueForSite(agencySpliting, newDateFieldRange);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    onLeaveDataField = changingValueForSite(onLeaveSpliting, newDateFieldRange);
                }
                if (splitVal[10] != "" && splitVal[10] != "null") {
                    for (var j = 0; j < allProjectsSpliting.length; j++) {


                        newDateFieldRange.push(allProjectsSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);

            }
			if (addSiteValue == "OnLeave") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    deliveryNoteDataField = changingValueForSite(deliveryNoteSpliting, newDateFieldRange);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    cylScanDataField = changingValueForSite(cylScanSpliting, newDateFieldRange);
                }
                if (arrayCompareResultscm.length > 0) {
                    scmDataField = changingValueForSite(scmSpliting, newDateFieldRange);
                }
                if (arrayCompareResultqBot.length > 0) {
                    qBotDataField = changingValueForSite(qBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultiBot.length > 0) {
                    iBotDataField = changingValueForSite(iBotSpliting, newDateFieldRange);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    datalakeDataField = changingValueForSite(datalakeSpliting, newDateFieldRange);
                }
                if (arrayCompareResultrpa.length > 0) {
                    rpaDataField = changingValueForSite(rpaSpliting, newDateFieldRange);
                }
                if (arrayCompareResultioT.length > 0) {
                    ioTDataField = changingValueForSite(ioTSpliting, newDateFieldRange);
                }
				 if (arrayCompareResultenterprisePortal.length > 0) {
                    enterprisePortalDataField = changingValueForSite(enterprisePortalSpliting, newDateFieldRange);
                }
				if (arrayCompareResultAgency.length > 0) {
                    enterprisePortalDataField = changingValueForSite(agencySpliting, newDateFieldRange);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    allProjectsDataField = changingValueForSite(allProjectsSpliting, newDateFieldRange);
                }
				
                if (splitVal[11] != "" && splitVal[11] != "null") {
                    for (var j = 0; j < enterprisePortalSpliting.length; j++) {


                        newDateFieldRange.push(enterprisePortalSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);

            }
        });
        $(".alertNo").click(function() {
            modal.style.display = "none";
            $("#bg_blocking_layer").show();
            if (addSiteValue == "Delivery Note") {
                if (arrayCompareResultcylScan.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, cylScanSpliting);
                }
                if (arrayCompareResultscm.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, scmSpliting);
                }
                if (arrayCompareResultqBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, qBotSpliting);
                }
                if (arrayCompareResultiBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, iBotSpliting);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, datalakeSpliting);
                }
                if (arrayCompareResultrpa.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, rpaSpliting);
                }
                if (arrayCompareResultioT.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, ioTSpliting);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, enterprisePortalSpliting);
                }
				if (arrayCompareResultAgency.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, agencySpliting);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, allProjectsSpliting);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, onLeaveSpliting);
                }
                if (splitVal[0] != "" && splitVal[0] != "null") {
                    for (var j = 0; j < deliveryNoteSpliting.length; j++) {


                        newDateFieldRange.push(deliveryNoteSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
            }

            if (addSiteValue == "CylScan") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, deliveryNoteSpliting);
                }
                if (arrayCompareResultscm.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, scmSpliting);
                }
                if (arrayCompareResultqBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, qBotSpliting);
                }
                if (arrayCompareResultiBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, iBotSpliting);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, datalakeSpliting);
                }
                if (arrayCompareResultrpa.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, rpaSpliting);
                }
                if (arrayCompareResultioT.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, ioTSpliting);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, enterprisePortalSpliting);
                }
				if (arrayCompareResultAgency.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, agencySpliting);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, allProjectsSpliting);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, onLeaveSpliting);
                }
                if (splitVal[1] != "" && splitVal[1] != "null") {
                    for (var j = 0; j < cylScanSpliting.length; j++) {


                        newDateFieldRange.push(cylScanSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
            }

            if (addSiteValue == "SCM FM") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, deliveryNoteSpliting);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, cylScanSpliting);
                }
                if (arrayCompareResultqBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, qBotSpliting);
                }
                if (arrayCompareResultiBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, iBotSpliting);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, datalakeSpliting);
                }
                if (arrayCompareResultrpa.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, rpaSpliting);
                }
                if (arrayCompareResultioT.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, ioTSpliting);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, enterprisePortalSpliting);
                }
				if (arrayCompareResultAgency.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, agencySpliting);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, allProjectsSpliting);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, onLeaveSpliting);
                }
                if (splitVal[2] != "" && splitVal[2] != "null") {
                    for (var j = 0; j < scmSpliting.length; j++) {


                        newDateFieldRange.push(scmSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
            }

            if (addSiteValue == "QBot") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, deliveryNoteSpliting);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, cylScanSpliting);
                }
                if (arrayCompareResultscm.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, scmSpliting);
                }
                if (arrayCompareResultiBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, iBotSpliting);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, datalakeSpliting);
                }
                if (arrayCompareResultrpa.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, rpaSpliting);
                }
                if (arrayCompareResultioT.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, ioTSpliting);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, enterprisePortalSpliting);
                }
				if (arrayCompareResultAgency.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, agencySpliting);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, allProjectsSpliting);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, onLeaveSpliting);
                }
                if (splitVal[3] != "" && splitVal[3] != "null") {
                    for (var j = 0; j < qBotSpliting.length; j++) {


                        newDateFieldRange.push(qBotSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
            }

            if (addSiteValue == "IBot") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, deliveryNoteSpliting);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, cylScanSpliting);
                }
                if (arrayCompareResultscm.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, scmSpliting);
                }
                if (arrayCompareResultqBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, qBotSpliting);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, datalakeSpliting);
                }
                if (arrayCompareResultrpa.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, rpaSpliting);
                }
                if (arrayCompareResultioT.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, ioTSpliting);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, enterprisePortalSpliting);
                }
				if (arrayCompareResultAgency.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, agencySpliting);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, allProjectsSpliting);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, onLeaveSpliting);
                }
                if (splitVal[4] != "" && splitVal[4] != "null") {
                    for (var j = 0; j < iBotSpliting.length; j++) {


                        newDateFieldRange.push(iBotSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
            }

            if (addSiteValue == "DataLake") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, deliveryNoteSpliting);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, cylScanSpliting);
                }
                if (arrayCompareResultscm.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, scmSpliting);
                }
                if (arrayCompareResultqBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, qBotSpliting);
                }
                if (arrayCompareResultiBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, iBotSpliting);
                }
                if (arrayCompareResultrpa.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, rpaSpliting);
                }
                if (arrayCompareResultioT.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, ioTSpliting);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, enterprisePortalSpliting);
                }
				if (arrayCompareResultAgency.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, agencySpliting);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, allProjectsSpliting);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, onLeaveSpliting);
                }
                if (splitVal[5] != "" && splitVal[5] != "null") {
                    for (var j = 0; j < datalakeSpliting.length; j++) {


                        newDateFieldRange.push(datalakeSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
            }

            if (addSiteValue == "RPA") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, deliveryNoteSpliting);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, cylScanSpliting);
                }
                if (arrayCompareResultscm.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, scmSpliting);
                }
                if (arrayCompareResultqBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, qBotSpliting);
                }
                if (arrayCompareResultiBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, iBotSpliting);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, datalakeSpliting);
                }
                if (arrayCompareResultioT.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, ioTSpliting);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, enterprisePortalSpliting);
                }
				if (arrayCompareResultAgency.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, agencySpliting);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, allProjectsSpliting);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, onLeaveSpliting);
                }
                if (splitVal[6] != "" && splitVal[6] != "null") {
                    for (var j = 0; j < rpaSpliting.length; j++) {


                        newDateFieldRange.push(rpaSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
            }


            if (addSiteValue == "IoT") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, deliveryNoteSpliting);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, cylScanSpliting);
                }
                if (arrayCompareResultscm.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, scmSpliting);
                }
                if (arrayCompareResultqBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, qBotSpliting);
                }
                if (arrayCompareResultiBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, iBotSpliting);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, datalakeSpliting);
                }
                if (arrayCompareResultrpa.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, rpaSpliting);
                }
                if (arrayCompareResultenterprisePortal.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, enterprisePortalSpliting);
                }
				if (arrayCompareResultAgency.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, agencySpliting);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, allProjectsSpliting);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, onLeaveSpliting);
                }
                if (splitVal[7] != "" && splitVal[7] != "null") {
                    for (var j = 0; j < ioTSpliting.length; j++) {


                        newDateFieldRange.push(ioTSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField)
            }

            if (addSiteValue == "Enterprise Portal") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, deliveryNoteSpliting);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, cylScanSpliting);
                }
                if (arrayCompareResultscm.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, scmSpliting);
                }
                if (arrayCompareResultqBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, qBotSpliting);
                }
                if (arrayCompareResultiBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, iBotSpliting);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, datalakeSpliting);
                }
                if (arrayCompareResultrpa.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, rpaSpliting);
                }
                if (arrayCompareResultioT.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, ioTSpliting);
                }
				if (arrayCompareResultAgency.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, agencySpliting);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, allProjectsSpliting);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, onLeaveSpliting);
                }
                if (splitVal[8] != "" && splitVal[8] != "null") {
                    for (var j = 0; j < enterprisePortalSpliting.length; j++) {


                        newDateFieldRange.push(enterprisePortalSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
            }
			
			    if (addSiteValue == "Agency") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, deliveryNoteSpliting);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, cylScanSpliting);
                }
                if (arrayCompareResultscm.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, scmSpliting);
                }
                if (arrayCompareResultqBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, qBotSpliting);
                }
                if (arrayCompareResultiBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, iBotSpliting);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, datalakeSpliting);
                }
                if (arrayCompareResultrpa.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, rpaSpliting);
                }
                if (arrayCompareResultioT.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, ioTSpliting);
                }
				if (arrayCompareResultenterprisePortal.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, enterprisePortalSpliting);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, allProjectsSpliting);
                }
				if (arrayCompareResultOnleave.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, onLeaveSpliting);
                }
                if (splitVal[9] != "" && splitVal[9] != "null") {
                    for (var j = 0; j < agencySpliting.length; j++) {


                        newDateFieldRange.push(agencySpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
            }
			    if (addSiteValue == "All Projects") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, deliveryNoteSpliting);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, cylScanSpliting);
                }
                if (arrayCompareResultscm.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, scmSpliting);
                }
                if (arrayCompareResultqBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, qBotSpliting);
                }
                if (arrayCompareResultiBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, iBotSpliting);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, datalakeSpliting);
                }
                if (arrayCompareResultrpa.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, rpaSpliting);
                }
                if (arrayCompareResultioT.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, ioTSpliting);
                }
				if (arrayCompareResultenterprisePortal.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, enterprisePortalSpliting);
                }
				if (arrayCompareResultAgency.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, agencySpliting);
                }
				
				if (arrayCompareResultOnleave.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, onLeaveSpliting);
                }
                if (splitVal[10] != "" && splitVal[10] != "null") {
                    for (var j = 0; j < allProjectsSpliting.length; j++) {


                        newDateFieldRange.push(allProjectsSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
            }
			    if (addSiteValue == "OnLeave") {
                if (arrayCompareResultdeliveryNote.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, deliveryNoteSpliting);
                }
                if (arrayCompareResultcylScan.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, cylScanSpliting);
                }
                if (arrayCompareResultscm.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, scmSpliting);
                }
                if (arrayCompareResultqBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, qBotSpliting);
                }
                if (arrayCompareResultiBot.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, iBotSpliting);
                }
                if (arrayCompareResultdatalake.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, datalakeSpliting);
                }
                if (arrayCompareResultrpa.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, rpaSpliting);
                }
                if (arrayCompareResultioT.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, ioTSpliting);
                }
				if (arrayCompareResultenterprisePortal.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, enterprisePortalSpliting);
                }
				if (arrayCompareResultAgency.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, agencySpliting);
                }
				if (arrayCompareResultAllProjects.length > 0) {
                    newDateFieldRange == changingValueForSite(newDateFieldRange, allProjectsSpliting);
                }
				
                if (splitVal[11] != "" && splitVal[11] != "null") {
                    for (var j = 0; j < onLeaveSpliting.length; j++) {


                        newDateFieldRange.push(onLeaveSpliting[j]);
                    }
                }
                newDateFieldRange = removeEmptyValues(newDateFieldRange);
                newDateFieldRange = removeDuplicate(newDateFieldRange);
                newDateFieldRange = newDateFieldRange.sort();
                stringDate = newDateFieldRange.join(";");

                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
            }
        });

        //end alertNo function
        $(".alertCancel").click(function() {
            modal.style.display = "none";

            $('.dateClass').val('');
            $('#roles').val('ChooseRole');
            $('#roles').val('ChooseRole');
            loadlist();
            $('.selectedAvail').removeClass('selectedAvail');
        });


    });

    $(".alertYesHoliday").click(function() {
        modalHoliday.style.display = "none";

        $("#bg_blocking_layer").show();
        if (addHolidayValue == "SingaporeHoliday") {
            if (arrayCompareResultFuzariahHoliday.length > 0) {
                fuzariahHolidayDataField = changingValueForHolidaySite(fujairahHolidayDataSpliting, newDateFieldRange);
            }
			if (arrayCompareResultIndiaHoliday.length > 0) {
                indiaHolidayDataField = changingValueForHolidaySite(indiaHolidayDataSpliting, newDateFieldRange);
            }
            newDateFieldRange = removeHolidayDuplicate(newDateFieldRange, singaporeHolidaySpliting);
            newDateFieldRange = removeEmptyValues(newDateFieldRange);

            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            if (itemHolidayID == 0) {
                var resultHolidayAdd = addHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField);
                resultHolidayAdd.done(function() {

                    $('.dateClass').val('');
                    $('#roles').val('ChooseRole');
                    loadlist();
                    $('.selectedAvail').removeClass('selectedAvail');

                    renderInit();
                });
                resultHolidayAdd.fail(function(arg) {
                    alert(arg);
                });
            } else {
                var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
                resultHolidayAdd.done(function() {

                    $('.dateClass').val('');
                    $('#roles').val('ChooseRole');
                    loadlist();
                    $('.selectedAvail').removeClass('selectedAvail');

                    renderInit();


                });
                resultHolidayAdd.fail(function(arg) {
                    alert(arg);
                });

            }

        }
        if (addHolidayValue == "FujairahHoliday") {
            if (arrayCompareResultSingaporeHoliday.length > 0) {
                singaporeHolidayDataField = changingValueForHolidaySite(singaporeHolidaySpliting, newDateFieldRange);
            }
			if (arrayCompareResultIndiaHoliday.length > 0) {
                indiaHolidayDataField = changingValueForHolidaySite(indiaHolidayDataSpliting, newDateFieldRange);
            }
            newDateFieldRange = removeHolidayDuplicate(newDateFieldRange, fujairahHolidayDataSpliting);
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            if (itemHolidayID == 0) {
                var resultHolidayAdd = addHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField);
                resultHolidayAdd.done(function() {

                    $('.dateClass').val('');
                    $('#roles').val('ChooseRole');
                    loadlist();
                    $('.selectedAvail').removeClass('selectedAvail');

                    renderInit();
                });
                resultHolidayAdd.fail(function(arg) {
                    alert(arg);
                });
            } else {
                var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
                resultHolidayAdd.done(function() {

                    $('.dateClass').val('');
                    $('#roles').val('ChooseRole');
                    loadlist();
                    $('.selectedAvail').removeClass('selectedAvail');

                    renderInit();


                });
                resultHolidayAdd.fail(function(arg) {
                    alert(arg);
                });

            }
        }
		if (addHolidayValue == "IndiaHoliday") {
            if (arrayCompareResultSingaporeHoliday.length > 0) {
                singaporeHolidayDataField = changingValueForHolidaySite(singaporeHolidaySpliting, newDateFieldRange);
            }
			 if (arrayCompareResultFuzariahHoliday.length > 0) {
                fuzariahHolidayDataField = changingValueForHolidaySite(fujairahHolidayDataSpliting, newDateFieldRange);
            }
            newDateFieldRange = removeHolidayDuplicate(newDateFieldRange, indiaHolidayDataSpliting);
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            if (itemHolidayID == 0) {
                var resultHolidayAdd = addHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField);
                resultHolidayAdd.done(function() {

                    $('.dateClass').val('');
                    $('#roles').val('ChooseRole');
                    loadlist();
                    $('.selectedAvail').removeClass('selectedAvail');

                    renderInit();
                });
                resultHolidayAdd.fail(function(arg) {
                    alert(arg);
                });
            } else {
                var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
                resultHolidayAdd.done(function() {

                    $('.dateClass').val('');
                    $('#roles').val('ChooseRole');
                    loadlist();
                    $('.selectedAvail').removeClass('selectedAvail');

                    renderInit();


                });
                resultHolidayAdd.fail(function(arg) {
                    alert(arg);
                });

            }
        }

    });
    $(".alertNoHoliday").click(function() {

        modalHoliday.style.display = "none";


        if (addHolidayValue == "SingaporeHoliday") {
            if (arrayCompareResultFuzariahHoliday.length > 0) {
                var afterRemovingNFH = removeHolidayValues(newDateFieldRange, fujairahHolidayDataSpliting); //removes data from new date
                var afterEmptyNFH = removeEmptyValues(afterRemovingNFH);
                newDateFieldRange = afterEmptyNFH;
                newDateFieldRange = newDateFieldRange.sort();
            }
			if (arrayCompareResultIndiaHoliday.length > 0) {
                var afterRemovingNFI = removeHolidayValues(newDateFieldRange, indiaHolidayDataSpliting); //removes data from new date
                var afterEmptyNFI = removeEmptyValues(afterRemovingNFI);
                newDateFieldRange = afterEmptyNFI;
                newDateFieldRange = newDateFieldRange.sort();
            }

            newDateFieldRange = removeHolidayDuplicate(newDateFieldRange, singaporeHolidaySpliting);
            newDateFieldRange = removeEmptyValues(newDateFieldRange);

            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            if (itemHolidayID == 0) {
                var resultHolidayAdd = addHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField);
                resultHolidayAdd.done(function() {

                    $('.dateClass').val('');
                    $('#roles').val('ChooseRole');
                    loadlist();
                    $('.selectedAvail').removeClass('selectedAvail');

                    renderInit();
                });
                resultHolidayAdd.fail(function(arg) {
                    alert(arg);
                });
            } else {
                var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField, indiaHolidayDataField);
                resultHolidayAdd.done(function() {

                    $('.dateClass').val('');
                    $('#roles').val('ChooseRole');
                    loadlist();
                    $('.selectedAvail').removeClass('selectedAvail');

                    renderInit();


                });
                resultHolidayAdd.fail(function(arg) {
                    alert(arg);
                });

            }
        }
        if (addHolidayValue == "FujairahHoliday") {
            if (arrayCompareResultSingaporeHoliday.length > 0) {
                var afterRemovingSFH = removeHolidayValues(newDateFieldRange, singaporeHolidaySpliting); //removes data from new date
                var afterEmptySFH = removeEmptyValues(afterRemovingSFH);
                newDateFieldRange = afterEmptySFH;
                newDateFieldRange = newDateFieldRange.sort();
            }
			if (arrayCompareResultIndiaHoliday.length > 0) {
                var afterRemovingNFI = removeHolidayValues(newDateFieldRange, indiaHolidayDataSpliting); //removes data from new date
                var afterEmptyNFI = removeEmptyValues(afterRemovingNFI);
                newDateFieldRange = afterEmptyNFI;
                newDateFieldRange = newDateFieldRange.sort();
            }
            newDateFieldRange = removeHolidayDuplicate(newDateFieldRange, fujairahHolidayDataSpliting);
            newDateFieldRange = removeEmptyValues(newDateFieldRange);

            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            if (itemHolidayID == 0) {
                var resultHolidayAdd = addHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField);
                resultHolidayAdd.done(function() {

                    $('.dateClass').val('');
                    $('#roles').val('ChooseRole');
                    loadlist();
                    $('.selectedAvail').removeClass('selectedAvail');

                    renderInit();
                });
                resultHolidayAdd.fail(function(arg) {
                    alert(arg);
                });
            } else {
                var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
                resultHolidayAdd.done(function() {

                    $('.dateClass').val('');
                    $('#roles').val('ChooseRole');
                    loadlist();
                    $('.selectedAvail').removeClass('selectedAvail');

                    renderInit();


                });
                resultHolidayAdd.fail(function(arg) {
                    alert(arg);
                });

            }
        }
		if (addHolidayValue == "IndiaHoliday") {
            if (arrayCompareResultSingaporeHoliday.length > 0) {
                var afterRemovingSFH = removeHolidayValues(newDateFieldRange, singaporeHolidaySpliting); //removes data from new date
                var afterEmptySFH = removeEmptyValues(afterRemovingSFH);
                newDateFieldRange = afterEmptySFH;
                newDateFieldRange = newDateFieldRange.sort();
            }
			 if (arrayCompareResultFuzariahHoliday.length > 0) {
                var afterRemovingNFH = removeHolidayValues(newDateFieldRange, fujairahHolidayDataSpliting); //removes data from new date
                var afterEmptyNFH = removeEmptyValues(afterRemovingNFH);
                newDateFieldRange = afterEmptyNFH;
                newDateFieldRange = newDateFieldRange.sort();
            }
            newDateFieldRange = removeHolidayDuplicate(newDateFieldRange, indiaHolidayDataSpliting);
            newDateFieldRange = removeEmptyValues(newDateFieldRange);

            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            if (itemHolidayID == 0) {
                var resultHolidayAdd = addHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField);
                resultHolidayAdd.done(function() {

                    $('.dateClass').val('');
                    $('#roles').val('ChooseRole');
                    loadlist();
                    $('.selectedAvail').removeClass('selectedAvail');

                    renderInit();
                });
                resultHolidayAdd.fail(function(arg) {
                    alert(arg);
                });
            } else {
                var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
                resultHolidayAdd.done(function() {

                    $('.dateClass').val('');
                    $('#roles').val('ChooseRole');
                    loadlist();
                    $('.selectedAvail').removeClass('selectedAvail');

                    renderInit();


                });
                resultHolidayAdd.fail(function(arg) {
                    alert(arg);
                });

            }
        }
    });
    $(".alertCancelHoliday").click(function() {
        modalHoliday.style.display = "none";

    });
    $(".alertDescription").click(function() {
        modalDescription.style.display = "none";

    });

    $(".mileSubmit").click(function() {

        siteMainUrl = _spPageContextInfo.webServerRelativeUrl
        addFieldValue = $("#nameInputMile").val();
        addFieldValueText = $("#nameInputMile").find("option:selected").text();
        lkaddFieldValue = new SP.FieldLookupValue();
        lkaddFieldValue.set_lookupId(addFieldValue);
        addRoleValue = $("#roleInputMile").val();
        addRoleValueText = $("#roleInputMile").find("option:selected").text();
        lkaddRoleValue = new SP.FieldLookupValue();
        lkaddRoleValue.set_lookupId(addRoleValue);

        addProjectValue = $("#projectInputMile").val();
        addProjectValueText = $("#projectInputMile").find("option:selected").text();
        lkaddProjectValue = new SP.FieldLookupValue();
        lkaddProjectValue.set_lookupId(addProjectValue);

        mileDesc = $('#descText').val();
        mileComment = $('#commentText').val();
        mileStart = $('#startpicker').val();
        mileEnd = $('#endpicker').val();
        mileStatus = $("#status").find("option:selected").text();
        statusMile = $("#status").val();
        lkaddStatusValue = new SP.FieldLookupValue();
        lkaddStatusValue.set_lookupId(statusMile);
        var month_mile = months[mile_month - 1];


        if (mileDesc != "" && mileStart != "" && mileEnd != "" && statusMile != "ChooseStatus") {
            var addMilestone = addMileListItem(siteMainUrl, "Milestone_ResourcePlanning", lkaddFieldValue, lkaddRoleValue, lkaddProjectValue, mileDesc, mileStart, mileEnd, lkaddStatusValue, mileComment, month_mile, mile_year)
            addMilestone.done(function() {

                $('#namesSearchMile').val('ChooseName');
			   $('#rolesSearchMile').val('ChooseRole');
			   $('#statusSearchMile').val('ChooseStatus');
			   var dateMile=new Date(mileStart);
			   $('.datepickerMileInput').datepicker('setDate', dateMile);
                modalMilestone.style.display = "none";
				alert("Milestone added");
			onChange();
            });


            addMilestone.fail(function() {});
        } else {
            alert("Please fill mandatory fields");
        }
    });
    $("#namesSearchMile").change(function() {

        onChange();

    });
    $("#rolesSearchMile").change(function() {

        onChange();

    });
	$(".datepickerMileInput").change(function() {

        onChange();

    });

	$("#statusSearchMile").change(function() {

        onChange();

    });
    $('.mileSave').click(function() {
        var siteMainUrl = _spPageContextInfo.webAbsoluteUrl;
        var saveId = $('.editItemId').val();
        var saveDesc = $('#descEditText').val();
        var saveStart = $('#startEditpicker').val();
        var saveEnd = $('#endEditpicker').val();
        var saveStatus = $("#statusEdit").val();
        var lkSaveValue = new SP.FieldLookupValue();
        lkSaveValue.set_lookupId(saveStatus);
        var saveComment = $('#commentEditText').val();


        if (mileEditMonth == undefined && mileEditYear == undefined) {
            var splitStart = saveStart.split('/');

            mileEditMonth = splitStart[0];
            mileEditYear = splitStart[2];

        }
        var month_Editmile = months[mileEditMonth - 1];
        if (saveDesc != "" && saveStart != "" && saveEnd != "" && saveStatus != "ChooseStatus") {
            var resultUpdateEdit = updateEditDate(siteMainUrl, saveId, saveStart, saveDesc, saveEnd, lkSaveValue, saveComment, month_Editmile, mileEditYear);
            resultUpdateEdit.done(function() {
                onChange();
                modalEditMilestone.style.display = "none";
            });
        } else {
            alert("Please fill mandatory fields");
        }
    });

});

function updateEditDate(siteMainUrl, itemId, saveStart, saveDesc, saveEnd, lkSaveValue, saveComment, month_Editmile, mileEditYear) {
    dfcUpdateEditItem = $.Deferred();
    var clientContext = new SP.ClientContext(siteMainUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('Milestone_ResourcePlanning');

    oListItem = oList.getItemById(itemId);
    oListItem.set_item('Description', saveDesc);
    oListItem.set_item('StartDate', saveStart);
    oListItem.set_item('EndDate', saveEnd);
    oListItem.set_item('Status', lkSaveValue);
    oListItem.set_item('Comments', saveComment);
    oListItem.set_item('Month', month_Editmile);
    oListItem.set_item('Year', mileEditYear);

    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryUpdateEditSucceeded), Function.createDelegate(this, this.onQueryUpdateEditFailed));
    return dfcUpdateEditItem.promise();
}

function onQueryUpdateEditSucceeded() {
    dfcUpdateEditItem.resolve();
}

function onQueryUpdateEditFailed(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcUpdateEditItem.reject();
}

function onChange() {
    $('.milestoneTable').empty();
    var siteMainUrl = _spPageContextInfo.webAbsoluteUrl;
    var saveName = "";
    var saveRole = "";
	var savedStatus="";
	var dateFieldData=$('.datepickerMileInput').val();
	var monthValue=dateFieldData.split(" ");
	monthField =monthValue[0];
    yearField = monthValue[1];
    saveName = $("#namesSearchMile").find("option:selected").text();
    saveRole = $("#rolesSearchMile").find("option:selected").text();
	savedStatus=$("#statusSearchMile").find("option:selected").text();
    modalEditMilestone = document.getElementById('milestoneEditModal');
    var resultDataMilestone = getData(siteMainUrl, saveName, saveRole, savedStatus, monthField, yearField);
    resultDataMilestone.done(function(listSaSuInfo) {
        var dataSplit = listSaSuInfo.split('|');

        var html = "";
        html = "<table class='milestoneTable'><tr>";
        html += '<th style="font-size:16px;">SL No</th><th style="font-size:16px">Name</th><th style="font-size:16px">Role</th><th style="font-size:16px">Project Name</th><th style="font-size:16px">Description</th><th style="font-size:16px">Start Date</th><th style="font-size:16px">End Date</th><th style="font-size:16px">Status</th><th style="font-size:16px">Comments</th><th></th><th></th>';
        var count = 0;
        for (var i = 0; i < dataSplit.length; i++) {
            var dataSpliting = dataSplit[i].split('$');
            var descSplit = dataSpliting[0];
            var startSplit = dataSpliting[2];

            var endSplit = dataSpliting[3];
            var commentSplit = dataSpliting[4];
            var idSplit = dataSpliting[1];
			var statusSplit=dataSpliting[5];
			var projectSplit=dataSpliting[6];
			var nameSplit=dataSpliting[7];
			var roleSplit=dataSpliting[8];
            startSplit = new Date(startSplit);
            endSplit = new Date(endSplit);
            startSplit = startSplit.format("MM/dd/yyyy");
            endSplit = endSplit.format("MM/dd/yyyy");
				if(commentSplit=="null"){
					commentSplit="";
				}
            if (descSplit != "" ) {

                html += "<tr class='milestoneCss' ><td style='width:1%'>" + (i + 1) + " </td><td style='width:9%'>" + nameSplit + "</td><td style='width:5%'>" + roleSplit + "</td><td style='width:5%'>" + projectSplit + "</td><td style='width:30%'>" + descSplit + "</td><td style='width:10%'>" + startSplit + "</td><td style='width:10%'>" + endSplit + "</td><td style='width:5%'>" + statusSplit + "</td><td style='width:15%'>" + commentSplit + "</td><td style='width:5%'><div class='editMilestone' id=" + idSplit + " >Edit</div></td><td style='width:5%'><div class='deleteMilestone' id='" + idSplit + "' >Delete</div></td></tr>";
                count++;
            }

        }
        if (dataSplit.length > 0) {
            $('.milestoneSection').show();
            $('.milestoneTable').remove();
            html += "</table>";
            if (count == 0)
                $('.milestoneSection').hide();
            $('.milestoneSection').append(html);
        } else {
            $('.milestoneSection').hide();
        }

        $('.editMilestone').click(function() {
            var mileId = $(this).attr('id');
            modalEditMilestone.style.display = "block";


            $('#startEditpicker').datepicker({
				 beforeShow: function(input) {
                $(input).datepicker('widget').removeClass('hide-calendar');
	
            },
                onSelect: function(dateText, inst) {
                    var date = $(this).datepicker('getDate');

                    mileEditMonth = date.getMonth() + 1;
                    mileEditYear = date.getFullYear();

                }
            });
            $('#endEditpicker').datepicker({
				 beforeShow: function(input) {
                $(input).datepicker('widget').removeClass('hide-calendar');
	
            }
			});
            var resultStatusLoad = loadStatusEditlist();
            resultStatusLoad.done(function() {
			
				
				
                var resultEditDataMilestone = getEditData(siteMainUrl, mileId);
                resultEditDataMilestone.done(function(listSaSuInfo) {
                    var editDataSplit = listSaSuInfo.split('|');
                    var dateStart = new Date(editDataSplit[1]);
                    var newstartDate = dateStart.toString('MM/dd/yyyy');
                    var dateEnd = new Date(editDataSplit[2]);
                    var newendDate = dateEnd.toString('MM/dd/yyyy');
					 $('#nameEditInputMile').val(editDataSplit[5]);
                    $('#roleEditInputMile').val(editDataSplit[6]);
                    $('#projectEditInputMile').val(editDataSplit[7]);
                    $('#descEditText').text(editDataSplit[0]);
                    $('#startEditpicker').val(newstartDate);
                    $('#endEditpicker').val(newendDate);
                    $('#statusEdit').val(editDataSplit[3]);
					if(editDataSplit[4]!="null"){
                    $('#commentEditText').text(editDataSplit[4]);
					}
                    $('.editItemId').val(mileId);

                
           
		});
		});
        });
        $('.deleteMilestone').click(function() {
            var mileDelId = $(this).attr('id');
            var conf = confirm("Are you sure want to delete the Milestone");
            if (conf) {
                var resultDelte = getDeleteData(siteMainUrl, mileDelId);
                resultDelte.done(function() {
                   
                    alert("Milestone has been deleted");
					 onChange();

                });
            }

        });


    });
}

function getDeleteData(SiteUrl, saveId) {
    dfcDeleteItem = $.Deferred();

    this.clientContext = new SP.ClientContext(SiteUrl);
    this.oList = clientContext.get_web().get_lists().getByTitle('Milestone_ResourcePlanning');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='ID'/><Value Type='Counter'>" + saveId + "</Value></Eq></Where></Query></View>");
    collDelListItem = oList.getItems(camlQuery);
    clientContext.load(collDelListItem);
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryDeleteSucceeded), Function.createDelegate(this, this.onQueryDeleteFailed));
    return dfcDeleteItem.promise();
}

function onQueryDeleteSucceeded(sender, args) {

    var listItemEnumerator = collDelListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        oListItem.deleteObject();
        break;
    }
    oList.update();
    clientContext.load(oList);
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryFinalDeleteSucceeded), Function.createDelegate(this, this.onQueryDeleteFailed));

}

function onQueryDeleteFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcDeleteItem.reject();
}

function onQueryFinalDeleteSucceeded(sender, args) {
    dfcDeleteItem.resolve();
}

function getEditData(siteMainUrl, itemId) {
    dfcRetriveEditMileItem = $.Deferred();

    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('Milestone_ResourcePlanning');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='ID'/><Value Type='Id'>" + itemId + "</Value></Eq></Where></Query></View>");
    collListItem = oList.getItems(camlQuery);

    clientContext.load(collListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryEditMileRetrieveSucceeded), Function.createDelegate(this, this.onQueryEditMileRetrieveFailed));

    return dfcRetriveEditMileItem.promise();
}

function onQueryEditMileRetrieveSucceeded(sender, args) {

    var listSaSuInfo = '';
    var listItemEnumerator = collListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {

        var oListItem = listItemEnumerator.get_current();
        listSaSuInfo += oListItem.get_item('Description') + "|" + oListItem.get_item('StartDate') + "|" + oListItem.get_item('EndDate') + "|" + oListItem.get_item('Status').get_lookupId() + "|" + oListItem.get_item('Comments') + "|" + oListItem.get_item('Name').get_lookupValue() + "|" + oListItem.get_item('Role').get_lookupValue() + "|" + oListItem.get_item('Project').get_lookupValue();

    }


    dfcRetriveEditMileItem.resolve(listSaSuInfo);
}

function onQueryEditMileRetrieveFailed(sender, args) {
    alert('Please add you name');
    //alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcRetriveEditMileItem.reject();
}

function getData(SiteUrl, saveName, saveRole, saveStatus, monthField, yearField) {
    dfcRetriveMileItem = $.Deferred();

    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('Milestone_ResourcePlanning');
    var camlQuery = new SP.CamlQuery();
	if(saveRole=="Choose Role" && saveStatus=="Choose Status" && saveName!="Choose Name" ){
    camlQuery.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='Name' /><Value Type='Lookup'>" + saveName + "</Value></Eq> <And><Eq><FieldRef Name='Month' /><Value Type='Text'>" + monthField + "</Value></Eq><Eq><FieldRef Name='Year' /><Value Type='Text'>" + yearField + "</Value></Eq></And></And></Where></Query></View>");
    }
	else if(saveName=="Choose Name" && saveStatus=="Choose Status" && saveRole!="Choose Role"){
	camlQuery.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='Role' /><Value Type='Lookup'>" + saveRole + "</Value></Eq> <And><Eq><FieldRef Name='Month' /><Value Type='Text'>" + monthField + "</Value></Eq><Eq><FieldRef Name='Year' /><Value Type='Text'>" + yearField + "</Value></Eq></And></And></Where></Query></View>");	
	}
	else if(saveName=="Choose Name" && saveRole=="Choose Role" && saveStatus!="Choose Status"){
	camlQuery.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='Status' /><Value Type='Lookup'>" + saveStatus + "</Value></Eq> <And><Eq><FieldRef Name='Month' /><Value Type='Text'>" + monthField + "</Value></Eq><Eq><FieldRef Name='Year' /><Value Type='Text'>" + yearField + "</Value></Eq></And></And></Where></Query></View>");	
	}
	else if(saveName=="Choose Name" && saveRole!="Choose Role" && saveStatus!="Choose Status"){
			camlQuery.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='Status' /><Value Type='Lookup'>" + saveStatus + "</Value></Eq><And><Eq><FieldRef Name='Role' /><Value Type='Lookup'>" + saveRole + "</Value></Eq><And><Eq><FieldRef Name='Month' /><Value Type='Text'>" + monthField + "</Value></Eq><Eq><FieldRef Name='Year' /><Value Type='Text'>" + yearField + "</Value></Eq></And></And></And></Where></Query></View>");
	}
	else if(saveRole=="Choose Role" && saveName!="Choose Name" && saveStatus!="Choose Status"){
			camlQuery.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='Name' /><Value Type='Lookup'>" + saveName + "</Value></Eq><And><Eq><FieldRef Name='Status' /><Value Type='Lookup'>" + saveStatus + "</Value></Eq><And><Eq><FieldRef Name='Month' /><Value Type='Text'>" + monthField + "</Value></Eq><Eq><FieldRef Name='Year' /><Value Type='Text'>" + yearField + "</Value></Eq></And></And></And></Where></Query></View>");
	}
	else if(saveStatus=="Choose Status" && saveRole!="Choose Role" && saveName!="Choose Name"){
	camlQuery.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='Name' /><Value Type='Lookup'>" + saveName + "</Value></Eq><And><Eq><FieldRef Name='Role' /><Value Type='Lookup'>" + saveRole + "</Value></Eq><And><Eq><FieldRef Name='Month' /><Value Type='Text'>" + monthField + "</Value></Eq><Eq><FieldRef Name='Year' /><Value Type='Text'>" + yearField + "</Value></Eq></And></And></And></Where></Query></View>");	
	}
	else if(saveName=="Choose Name" && saveRole=="Choose Role" && saveStatus=="Choose Status"){
	camlQuery.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='Month' /><Value Type='Text'>" + monthField + "</Value></Eq><Eq><FieldRef Name='Year' /><Value Type='Text'>" + yearField + "</Value></Eq></And></Where></Query></View>");	
	}
	else {
		camlQuery.set_viewXml("<View><Query><Where> <And><Eq><FieldRef Name='Name' /><Value Type='Lookup'>" + saveName + "</Value></Eq><And><Eq><FieldRef Name='Role' /><Value Type='Lookup'>" + saveRole + "</Value></Eq><And><Eq><FieldRef Name='Status' /><Value Type='Lookup'>" + saveStatus + "</Value></Eq><And><Eq><FieldRef Name='Month' /><Value Type='Text'>" + monthField + "</Value></Eq><Eq><FieldRef Name='Year' /><Value Type='Text'>" + yearField + "</Value></Eq></And></And></And></And></Where></Query></View>");
	}
	collListItem = oList.getItems(camlQuery);

    clientContext.load(collListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryMileRetrieveSucceeded), Function.createDelegate(this, this.onQueryMileRetrieveFailed));

    return dfcRetriveMileItem.promise();
}

function onQueryMileRetrieveSucceeded(sender, args) {

    var listSaSuInfo = '';
    var listItemEnumerator = collListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        listSaSuInfo += oListItem.get_item('Description') + "$" + oListItem.get_item('ID') + "$" + oListItem.get_item('StartDate') + "$" + oListItem.get_item('EndDate') + "$" + oListItem.get_item('Comments') + "$" +oListItem.get_item('Status').get_lookupValue()+"$" +oListItem.get_item('Project').get_lookupValue()+"$"+oListItem.get_item('Name').get_lookupValue()+"$"+oListItem.get_item('Role').get_lookupValue()+"|";
	
    }


    dfcRetriveMileItem.resolve(listSaSuInfo);
}

function onQueryMileRetrieveFailed(sender, args) {
    alert('Please add you name');
    //alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcRetriveMileItem.reject();
}

function addMileListItem(siteUrl, lstName, lkaddFieldValue, lkaddRoleValue, lkaddProjectValue, mileDesc, mileStart, mileEnd, lkaddStatusValue, mileComment, mileMonthValue, mile_year) {
    dfcAddMileItem = $.Deferred();
    var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(lstName);

    var itemCreateInfo = new SP.ListItemCreationInformation();

    oListItem = oList.addItem(itemCreateInfo);
    oListItem.set_item("Name", lkaddFieldValue);
    oListItem.set_item("Role", lkaddRoleValue);
    oListItem.set_item("Project", lkaddProjectValue);
    oListItem.set_item("Description", mileDesc);
    oListItem.set_item("StartDate", mileStart);
    oListItem.set_item("EndDate", mileEnd);
    oListItem.set_item("Status", lkaddStatusValue);
    oListItem.set_item("Comments", mileComment);
    oListItem.set_item("Month", mileMonthValue);
    oListItem.set_item("Year", mile_year);

    oListItem.update();

    clientContext.load(oListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryMileSucceeded), Function.createDelegate(this, this.onQueryMileFailed));
    return dfcAddMileItem.promise();
}

function onQueryMileSucceeded() {


    dfcAddMileItem.resolve();
}

function onQueryMileFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcAddMileItem.reject();
}



function loadlist() {
    dfcloadList = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Names_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccess,
        error: onerror
    });
    return dfcloadList.promise();
}

function onsuccess(lstdata) {
    $("#names").empty();
    $("#names").append("<option value=" + "ChooseName" + " >" + "Choose Name" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem = lstdata.d.results[i];


        $("#names").append("<option value=" + lstitem.Id + ">" + lstitem.Name + "</option>");


    }

    dfcloadList.resolve();
}

function onerror(lstdata, errCode, errMessage) {
    alert("Error1: " + errMessage);
    dfcloadList.reject();
}

function loadStatuslist() {
    dfcloadStatuslist = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Status_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessStatus,
        error: onerrorStatus
    });
    return dfcloadStatuslist.promise();
}

function onsuccessStatus(lstdata) {
    $("#status").empty();
    $("#status").append("<option value=" + "ChooseStatus" + " >" + "Choose Status" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem = lstdata.d.results[i];


        $("#status").append("<option value=" + lstitem.Id + ">" + lstitem.Title + "</option>");


    }

    dfcloadStatuslist.resolve();
}

function onerrorStatus(lstdata, errCode, errMessage) {
    alert("Errorstatus: " + errMessage);
    dfcloadStatuslist.reject();
}
function loadRender()
{
	var param1 = new Date();
        var param2 = (param1.getMonthName()) + ' ' + param1.getFullYear();
        $('.datepickerInput').val(param2);
		$('.datepickerMileInput').val(param2);
		renderInit();
}
function loadNamesMilelist() {
    dfcloadNamesMilelist = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Names_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessNamesMile,
        error: onerrorNamesMile
    });
    return dfcloadNamesMilelist.promise();
}

function onsuccessNamesMile(lstdata) {
    $("#nameInputMile").empty();
    $("#nameInputMile").append("<option value=" + "ChooseName" + " >" + "Choose Name" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem = lstdata.d.results[i];


        $("#nameInputMile").append("<option value=" + lstitem.Id + ">" + lstitem.Name + "</option>");


    }

    dfcloadNamesMilelist.resolve();
}

function onerrorNamesMile(lstdata, errCode, errMessage) {
    alert("Errorstatus: " + errMessage);
    dfcloadNamesMilelist.reject();
}

function loadNamesSearchMilelist() {
    dfcloadNamesSearchMilelist = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Names_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessNamesSearchMile,
        error: onerrorNamesSearchMile
    });
    return dfcloadNamesSearchMilelist.promise();
}

function onsuccessNamesSearchMile(lstdata) {
    $("#namesSearchMile").empty();
    $("#namesSearchMile").append("<option value=" + "ChooseName" + " >" + "Choose Name" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem = lstdata.d.results[i];


        $("#namesSearchMile").append("<option value=" + lstitem.Id + ">" + lstitem.Name + "</option>");


    }
		loadRolesSearchMilelist();
    dfcloadNamesSearchMilelist.resolve();
}

function onerrorNamesSearchMile(lstdata, errCode, errMessage) {
    alert("Errorstatus: " + errMessage);
    dfcloadNamesSearchMilelist.reject();
}

function loadRolesSearchMilelist() {
    dfcloadRolesSearchMilelist = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Roles_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessRolesSearchMile,
        error: onerrorRoleSearchMile
    });
    return dfcloadRolesSearchMilelist.promise();
}

function onsuccessRolesSearchMile(lstdata) {
    $("#rolesSearchMile").empty();
    $("#rolesSearchMile").append("<option value=" + "ChooseRole" + " >" + "Choose Role" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem = lstdata.d.results[i];


        $("#rolesSearchMile").append("<option value=" + lstitem.Id + ">" + lstitem.Role + "</option>");


    }
		loadStatusSearchlist();
    dfcloadRolesSearchMilelist.resolve();
}

function onerrorRoleSearchMile(lstdata, errCode, errMessage) {
    alert("Errorstatus: " + errMessage);
    dfcloadRolesSearchMilelist.reject();
}

function loadRolesMilelist() {
    dfcloadRolesMilelist = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Roles_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessRolesMile,
        error: onerrorRoleMile
    });
    return dfcloadRolesMilelist.promise();
}

function onsuccessRolesMile(lstdata) {
    $("#roleInputMile").empty();
    $("#roleInputMile").append("<option value=" + "ChooseRole" + " >" + "Choose Role" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem = lstdata.d.results[i];


        $("#roleInputMile").append("<option value=" + lstitem.Id + ">" + lstitem.Role + "</option>");


    }

    dfcloadRolesMilelist.resolve();
}

function onerrorRoleMile(lstdata, errCode, errMessage) {
    alert("Errorstatus: " + errMessage);
    dfcloadRolesMilelist.reject();
}
function loadStatusSearchlist() {
    dfcloadStatuslist = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Status_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessStatusSearch,
        error: onerrorStatusSearch
    });
    return dfcloadStatuslist.promise();
}

function onsuccessStatusSearch(lstdata) {
    $("#statusSearchMile").empty();
    $("#statusSearchMile").append("<option value=" + "ChooseStatus" + " >" + "Choose Status" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem = lstdata.d.results[i];


        $("#statusSearchMile").append("<option value=" + lstitem.Id + ">" + lstitem.Title + "</option>");


    }

    dfcloadStatuslist.resolve();
}

function onerrorStatusSearch(lstdata, errCode, errMessage) {
    alert("Errorstatus: " + errMessage);
    dfcloadStatuslist.reject();
}
function loadProjectMilelist() {
    dfcloadProjectMilelist = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/ProjectName";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessProjectMile,
        error: onerrorProjectMile
    });
    return dfcloadProjectMilelist.promise();
}

function onsuccessProjectMile(lstdata) {
    $("#projectInputMile").empty();
    $("#projectInputMile").append("<option value=" + "ChooseProject" + " >" + "Choose Project" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem = lstdata.d.results[i];


        $("#projectInputMile").append("<option value=" + lstitem.Id + ">" + lstitem.ProjectName + "</option>");


    }

    dfcloadProjectMilelist.resolve();
}

function onerrorProjectMile(lstdata, errCode, errMessage) {
    alert("Errorstatus: " + errMessage);
    dfcloadProjectMilelist.reject();
}

function loadStatusEditlist() {
    dfcloadStatusEditlist = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Status_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessStatusEdit,
        error: onerrorStatusEdit
    });
    return dfcloadStatusEditlist.promise();
}

function onsuccessStatusEdit(lstdata) {
    $("#statusEdit").empty();
    $("#statusEdit").append("<option value=" + "ChooseStatus" + " >" + "Choose Status" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem = lstdata.d.results[i];


        $("#statusEdit").append("<option value=" + lstitem.Id + ">" + lstitem.Title + "</option>");


    }
   
    dfcloadStatusEditlist.resolve();
}

function onerrorStatusEdit(lstdata, errCode, errMessage) {
    alert("Errorstatus: " + errMessage);
    dfcloadStatusEditlist.reject();
}

function loadNamesEditMilelist() {
    dfcloadNamesEditMilelist = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Names_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessNamesEditMile,
        error: onerrorNamesEditMile
    });
    return dfcloadNamesEditMilelist.promise();
}

function onsuccessNamesEditMile(lstdata) {
    $("#nameEditInputMile").empty();
    $("#nameEditInputMile").append("<option value=" + "ChooseName" + " >" + "Choose Name" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem = lstdata.d.results[i];


        $("#nameEditInputMile").append("<option value=" + lstitem.Id + ">" + lstitem.Name + "</option>");


    }

    dfcloadNamesEditMilelist.resolve();
}

function onerrorNamesEditMile(lstdata, errCode, errMessage) {
    alert("Errorstatus: " + errMessage);
    dfcloadNamesEditMilelist.reject();
}

function loadRolesEditMilelist() {
    dfcloadRolesEditMilelist = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Roles_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessRolesEditMile,
        error: onerrorRoleEditMile
    });
    return dfcloadRolesEditMilelist.promise();
}

function onsuccessRolesEditMile(lstdata) {
    $("#roleEditInputMile").empty();
    $("#roleEditInputMile").append("<option value=" + "ChooseRole" + " >" + "Choose Role" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem = lstdata.d.results[i];


        $("#roleEditInputMile").append("<option value=" + lstitem.Id + ">" + lstitem.Role + "</option>");


    }
    
    dfcloadRolesEditMilelist.resolve();
}

function onerrorRoleEditMile(lstdata, errCode, errMessage) {
    alert("Errorstatus: " + errMessage);
    dfcloadRolesEditMilelist.reject();
}

function loadProjectEditMilelist() {
    dfcloadProjectEditMilelist = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/ProjectName";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessProjectEditMile,
        error: onerrorProjectEditMile
    });
    return dfcloadProjectEditMilelist.promise();
}

function onsuccessProjectEditMile(lstdata) {
    $("#projectEditInputMile").empty();
    $("#projectEditInputMile").append("<option value=" + "ChooseProject" + " >" + "Choose Project" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem = lstdata.d.results[i];


        $("#projectEditInputMile").append("<option value=" + lstitem.Id + ">" + lstitem.ProjectName + "</option>");


    }

    dfcloadProjectEditMilelist.resolve();
}

function onerrorProjectEditMile(lstdata, errCode, errMessage) {
    alert("Errorstatus: " + errMessage);
    dfcloadProjectEditMilelist.reject();
}


function loadrolelist() {
    dfcloadRoleList = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Roles_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccess1,
        error: onerror1
    });
    return dfcloadRoleList.promise();
}

function onsuccess1(lstdata) {
    $("#roles").empty();
    $("#roles").append("<option value=" + "ChooseRole" + " >" + "Choose Role" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem1 = lstdata.d.results[i];


        $("#roles").append("<option value=" + lstitem1.Id + ">" + lstitem1.Role + "</option>");

    }

    dfcloadRoleList.resolve();
}

function onerror1(lstdata, errCode, errMessage) {
    alert("Error2: " + errMessage);
    dfcloadRoleList.reject();
}

function renderDataColorCodes() {
    dfcRenderDataColorloadList = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/ProjectName";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessRenderColorData,

        error: onerrorRenderDataColor
    });
    return dfcRenderDataColorloadList.promise();
}

function onsuccessRenderColorData(lstdata) {

    var renderNamesTableHTML = "<table class='renderColorTable'><tr>";

    for (var i = 0; i < lstdata.d.results.length; i++) {

        var renderitem = lstdata.d.results[i];


        renderNamesTableHTML += '<td  class="' + renderitem.ProjectName + '" type="text" name="fname" placeholder="' + renderitem.ProjectName + '" >' + renderitem.ProjectName + '</td>';
        if (i % 2 == 1) {
            renderNamesTableHTML += '</tr><tr>';
        }

    }
    renderNamesTableHTML += '<td  class="CancelItem" type="text" name="fname" placeholder="CancelItem">Cancel</td>';


    renderNamesTableHTML += "</tr></table>";
    $('.renderColorTable').append(renderNamesTableHTML);

    $(".Delivery, .CylScan, .SCM, .QBot, .IBot, .DataLake, .RPA, .Enterprise, .IoT, .CancelItem, .Agency, .All ,.OnLeave").on('click dblclick', function() {
        $("#bg_blocking_layer").show();
        $('.selectedAvail').removeClass('selectedAvail');

        addSiteValue = $(this).text();

        $(this).addClass('selectedAvail');
        dataSubmit();
    });
    dfcRenderDataColorloadList.resolve();
}

function onerrorRenderDataColor(lstdata, errCode, errMessage) {
    alert("Error3: " + errMessage);
    dfcRenderDataColorloadList.reject();
}


function renderHolidayCodes() {
    dfcRenderHolidayloadList = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Holiday_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessRenderHoliday,
        error: onerrorRenderHoliday
    });
    return dfcRenderHolidayloadList.promise();
}

function onsuccessRenderHoliday(lstdata) {

    var renderHolidayTableHTML = ""; //"<table class='renderTable'>";
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var renderitem = lstdata.d.results[i];


        renderHolidayTableHTML += '<tr class="' + renderitem.ID + '"><td class="' + renderitem.Title + '" type="text" name="fname" placeholder="' + renderitem.Title + '"  >' + renderitem.Title + '</td></tr>';

    }


    renderHolidayTableHTML += '<tr class="cancelHoliday"><td class="cancelHoliday" type="text" name="fname" placeholder="cancelHoliday">Cancel</td></tr>';

    $('.renderHolidayTable').append(renderHolidayTableHTML);
    $(".SingaporeHoliday,.FujairahHoliday,.IndiaHoliday").on('click dblclick', function() {
		
        $('.selectedAvail').removeClass('selectedAvail');
        addHolidayValue = $(this).text();
        $(this).addClass('selectedAvail');
        var descriptionData = $('.descriptionData').val("");
        modalDescription = document.getElementById('descriptionHoliday');


        modalDescription.style.display = "block";


    });

    $(".cancelHoliday").on('click dblclick', function() {

        $('.selectedAvail').removeClass('selectedAvail');
        addHolidayValue = $(this).text();
        $(this).addClass('selectedAvail');

        dataHolidaySubmit("Cancel");
    });

    dfcRenderHolidayloadList.resolve();
}

function onerrorRenderHoliday(lstdata, errCode, errMessage) {
    alert("Error4: " + errMessage);
    dfcRenderHolidayloadList.reject();
}

function dataHolidaySubmit(descriptionData) {
    siteMainUrl = _spPageContextInfo.webServerRelativeUrl;

    dateFilter = $('input[name="datefilter"]').val();
    dateSpliting = dateFilter.split('to');
    startDateRange = dateSpliting[0];
    endDateRange = dateSpliting[1];

    newDateRange = startDateRange;

    startDateRange = new Date(startDateRange);
    endDateRange = new Date(endDateRange);
    renderStartDate = new Date(startDateRange);

    stringDate = "";
    while (startDateRange <= endDateRange) {
        month_value = startDateRange.getMonth();
        monthField = months[month_value];
        yearField = startDateRange.getFullYear();

        itemHolidayID = 0;
        var tempDate = "";
        var dd = startDateRange.getDate();
        var mm = startDateRange.getMonth() + 1; //January is 0!

        var yyyy = startDateRange.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        tempDate = mm + '/' + dd + '/' + yyyy;
        tempDate = tempDate + "|" + descriptionData;
        stringDate += tempDate + ';';


        startDateRange.setDate(startDateRange.getDate() + 1);
    }

    if ($('.dateClass').val() != "" && $('.selectedAvail').length != 0) {
        var resultHolidayData = getSavedHolidayData(siteMainUrl, monthField, yearField);
        resultHolidayData.done(function(itemHolidayID, listSaSuInfo) {

            if (listSaSuInfo != "") {
                splitVal = listSaSuInfo.split(":");
                singaporeHolidaySpliting = splitVal[0].split(";");
                fujairahHolidayDataSpliting = splitVal[1].split(";");
				indiaHolidayDataSpliting=splitVal[2].split(";");
                singaporeHolidayDataField = singaporeHolidaySpliting.join(";");
                fuzariahHolidayDataField = fujairahHolidayDataSpliting.join(";");
				indiaHolidayDataField=indiaHolidayDataSpliting.join(";");
                newDateFieldRange = stringDate.split(";");
                arrayCompareResultSingaporeHoliday = comparingTwoArrayHoliday(newDateFieldRange, singaporeHolidaySpliting);
                arrayCompareResultFuzariahHoliday = comparingTwoArrayHoliday(newDateFieldRange, fujairahHolidayDataSpliting);
				arrayCompareResultIndiaHoliday=comparingTwoArrayHoliday(newDateFieldRange, indiaHolidayDataSpliting);

                if (addHolidayValue == "SingaporeHoliday") {
                    if (arrayCompareResultFuzariahHoliday.length > 0 || arrayCompareResultIndiaHoliday.length > 0) {
                        modalHoliday = document.getElementById('myModalHoliday');
                        $("#bg_blocking_layer").hide();
                        modalHoliday.style.display = "block";

                    } 
					else {

                        newDateFieldRange = removeHolidayDuplicate(newDateFieldRange, singaporeHolidaySpliting);
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");
                        $("#bg_blocking_layer").hide();
                        if (itemHolidayID == 0) {
                            var resultHolidayAdd = addHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField);
                            resultHolidayAdd.done(function() {

                                $('.dateClass').val('');
                                $('#roles').val('ChooseRole');
                                loadlist();
                                $('.selectedAvail').removeClass('selectedAvail');

                                renderInit();
                            });
                            resultHolidayAdd.fail(function(arg) {
                                alert(arg);
                            });
                        } else {
                            var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
                            resultHolidayAdd.done(function() {

                                $('.dateClass').val('');
                                $('#roles').val('ChooseRole');
                                loadlist();
                                $('.selectedAvail').removeClass('selectedAvail');

                                renderInit();


                            });
                            resultHolidayAdd.fail(function(arg) {
                                alert(arg);
                            });

                        }
                    }
                }
                if (addHolidayValue == "FujairahHoliday") {
                    if (arrayCompareResultSingaporeHoliday.length > 0 || arrayCompareResultIndiaHoliday.length >0 ) {
                        modalHoliday = document.getElementById('myModalHoliday');
                        $("#bg_blocking_layer").hide();
                        modalHoliday.style.display = "block";


                    } else {

                        newDateFieldRange = removeHolidayDuplicate(newDateFieldRange, fujairahHolidayDataSpliting);
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");
                        $("#bg_blocking_layer").hide();
                        if (itemHolidayID == 0) {
                            var resultHolidayAdd = addHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField);
                            resultHolidayAdd.done(function() {

                                $('.dateClass').val('');
                                $('#roles').val('ChooseRole');
                                loadlist();
                                $('.selectedAvail').removeClass('selectedAvail');

                                renderInit();
                            });
                            resultHolidayAdd.fail(function(arg) {
                                alert(arg);
                            });
                        } else {
                            var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
                            resultHolidayAdd.done(function() {

                                $('.dateClass').val('');
                                $('#roles').val('ChooseRole');
                                loadlist();
                                $('.selectedAvail').removeClass('selectedAvail');

                                renderInit();


                            });
                            resultHolidayAdd.fail(function(arg) {
                                alert(arg);
                            });

                        }
                    }
                }
				if (addHolidayValue == "IndiaHoliday") {
                    if (arrayCompareResultSingaporeHoliday.length > 0 || arrayCompareResultFuzariahHoliday.length > 0) {
                        modalHoliday = document.getElementById('myModalHoliday');
                        $("#bg_blocking_layer").hide();
                        modalHoliday.style.display = "block";


                    } else {

                        newDateFieldRange = removeHolidayDuplicate(newDateFieldRange, indiaHolidayDataSpliting);
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");
                        $("#bg_blocking_layer").hide();
                        if (itemHolidayID == 0) {
                            var resultHolidayAdd = addHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField);
                            resultHolidayAdd.done(function() {

                                $('.dateClass').val('');
                                $('#roles').val('ChooseRole');
                                loadlist();
                                $('.selectedAvail').removeClass('selectedAvail');

                                renderInit();
                            });
                            resultHolidayAdd.fail(function(arg) {
                                alert(arg);
                            });
                        } else {
                            var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
                            resultHolidayAdd.done(function() {

                                $('.dateClass').val('');
                                $('#roles').val('ChooseRole');
                                loadlist();
                                $('.selectedAvail').removeClass('selectedAvail');

                                renderInit();


                            });
                            resultHolidayAdd.fail(function(arg) {
                                alert(arg);
                            });

                        }
                    }
                }
                if (addHolidayValue == "Cancel") {
                    if (arrayCompareResultSingaporeHoliday.length > 0) {
                        singaporeHolidayDataField = changingValueForHolidaySite(singaporeHolidaySpliting, newDateFieldRange);
                    }
                    if (arrayCompareResultFuzariahHoliday.length > 0) {
                        fuzariahHolidayDataField = changingValueForHolidaySite(fujairahHolidayDataSpliting, newDateFieldRange);
                    }
					if (arrayCompareResultIndiaHoliday.length > 0) {
                        indiaHolidayDataField = changingValueForHolidaySite(indiaHolidayDataSpliting, newDateFieldRange);
                    }
                    $("#bg_blocking_layer").hide();
                    if (itemHolidayID == 0) {
                        var resultHolidayAdd = addHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField);
                        resultHolidayAdd.done(function() {

                            $('.dateClass').val('');
                            $('#roles').val('ChooseRole');
                            loadlist();
                            $('.selectedAvail').removeClass('selectedAvail');

                            renderInit();
                        });
                        resultHolidayAdd.fail(function(arg) {
                            alert(arg);
                        });
                    } else {
                        var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
                        resultHolidayAdd.done(function() {

                            $('.dateClass').val('');
                            $('#roles').val('ChooseRole');
                            loadlist();
                            $('.selectedAvail').removeClass('selectedAvail');

                            renderInit();


                        });
                        resultHolidayAdd.fail(function(arg) {
                            alert(arg);
                        });

                    }
                }
            } else {
                if (itemHolidayID == 0) {
                    var resultHolidayAdd = addHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField);
                    resultHolidayAdd.done(function() {

                        $('.dateClass').val('');
                        $('#roles').val('ChooseRole');
                        loadlist();
                        $('.selectedAvail').removeClass('selectedAvail');

                        renderInit();
                    });
                    resultHolidayAdd.fail(function(arg) {
                        alert(arg);
                    });
                } else {
                    var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "HolidayData_ResourcePlanning", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
                    resultHolidayAdd.done(function() {

                        $('.dateClass').val('');
                        $('#roles').val('ChooseRole');
                        loadlist();
                        $('.selectedAvail').removeClass('selectedAvail');

                        renderInit();


                    });
                    resultHolidayAdd.fail(function(arg) {
                        alert(arg);
                    });

                }

            }




        });
        resultHolidayData.fail(function(arg) {
            alert(arg);
        });
    } else {
        $("#bg_blocking_layer").hide();
		
        alert("Please select date");
		$('.selectedAvail').removeClass('selectedAvail');
    }
}

function dataSubmit() {
    siteMainUrl = _spPageContextInfo.webServerRelativeUrl;

    addFieldValue = $("#names").val();
    addFieldValueText = $("#names").find("option:selected").text();
    lkaddFieldValue = new SP.FieldLookupValue();
    lkaddFieldValue.set_lookupId(addFieldValue);
    addRoleValue = $("#roles").val();
    addRoleValueText = $("#roles").find("option:selected").text();
    lkaddRoleValue = new SP.FieldLookupValue();
    lkaddRoleValue.set_lookupId(addRoleValue);

    dateField = $(".dateClass").val();
    newSiteValue = $(".dropDownLoc").find("option:selected").text();
    dateFilter = $('input[name="datefilter"]').val();
    dateSpliting = dateFilter.split('to');
    startDateRange = dateSpliting[0];
    endDateRange = dateSpliting[1];

    itemID = 0;
    newDateRange = startDateRange;

    startDateRange = new Date(startDateRange);
    endDateRange = new Date(endDateRange);
    renderStartDate = new Date(startDateRange);

    stringDate = "";
    while (startDateRange <= endDateRange) {
        month_value = startDateRange.getMonth();
        monthField = months[month_value];
        yearField = startDateRange.getFullYear();


        var tempDate = "";
        var dd = startDateRange.getDate();
        var mm = startDateRange.getMonth() + 1; //January is 0!

        var yyyy = startDateRange.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        tempDate = mm + '/' + dd + '/' + yyyy;
        stringDate += tempDate + ';';


        startDateRange.setDate(startDateRange.getDate() + 1);
    }
	    if (addFieldValueText != "Choose Name" && $('.dateClass').val() != "" && $('.selectedAvail').length != 0 && $('#roles').val() != "ChooseRole") {
    
        var resultSvSb = getSavedSubmitData(siteMainUrl, addFieldValueText, addRoleValueText, monthField, yearField);
        resultSvSb.done(function(itemID, listSaSuInfo) {

            if (listSaSuInfo != "") {
                splitVal = listSaSuInfo.split(":");
                deliveryNoteSpliting = splitVal[0].split(";");
                cylScanSpliting = splitVal[1].split(";");
                scmSpliting = splitVal[2].split(";");
                qBotSpliting = splitVal[3].split(";");
                iBotSpliting = splitVal[4].split(";");
                datalakeSpliting = splitVal[5].split(";");
                rpaSpliting = splitVal[6].split(";");
                ioTSpliting = splitVal[7].split(";");
                enterprisePortalSpliting = splitVal[8].split(";");
				agencySpliting=splitVal[9].split(";");
				allProjectsSpliting=splitVal[10].split(";");
				onLeaveSpliting=splitVal[11].split(";");
				
                newDateFieldRange = stringDate.split(";")
                deliveryNoteDataField = deliveryNoteSpliting.join(";");
                cylScanDataField = cylScanSpliting.join(";");
                scmDataField = scmSpliting.join(";");
                qBotDataField = qBotSpliting.join(";");
                iBotDataField = iBotSpliting.join(";");
                datalakeDataField = datalakeSpliting.join(";");
                rpaDataField = rpaSpliting.join(";");
                ioTDataField = ioTSpliting.join(";");
                enterprisePortalDataField = enterprisePortalSpliting.join(";");
				agencyDataField=agencySpliting.join(";");
				allProjectsDataField=allProjectsSpliting.join(";");
				onLeaveDataField=onLeaveSpliting.join(";");
				
                arrayCompareResultdeliveryNote = comparingTwoArray(newDateFieldRange, deliveryNoteSpliting);
                arrayCompareResultcylScan = comparingTwoArray(newDateFieldRange, cylScanSpliting);
                arrayCompareResultscm = comparingTwoArray(newDateFieldRange, scmSpliting);
                arrayCompareResultqBot = comparingTwoArray(newDateFieldRange, qBotSpliting);
                arrayCompareResultiBot = comparingTwoArray(newDateFieldRange, iBotSpliting);
                arrayCompareResultdatalake = comparingTwoArray(newDateFieldRange, datalakeSpliting);
                arrayCompareResultrpa = comparingTwoArray(newDateFieldRange, rpaSpliting);
                arrayCompareResultioT = comparingTwoArray(newDateFieldRange, ioTSpliting);
                arrayCompareResultenterprisePortal = comparingTwoArray(newDateFieldRange, enterprisePortalSpliting);
				arrayCompareResultAgency=comparingTwoArray(newDateFieldRange, agencySpliting);
				arrayCompareResultAllProjects=comparingTwoArray(newDateFieldRange, allProjectsSpliting);
				arrayCompareResultOnleave=comparingTwoArray(newDateFieldRange, onLeaveSpliting);
				
                $("#bg_blocking_layer").hide();
                if (addSiteValue == "Delivery Note") {
                    if (arrayCompareResultcylScan.length > 0 || arrayCompareResultscm.length > 0 || arrayCompareResultqBot.length > 0 || arrayCompareResultiBot.length > 0 || arrayCompareResultdatalake.length > 0 || arrayCompareResultrpa.length > 0 || arrayCompareResultioT.length > 0 || arrayCompareResultenterprisePortal.length > 0 || arrayCompareResultAgency.length > 0  || arrayCompareResultAllProjects.length>0 || arrayCompareResultOnleave.length>0) {
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";


                    } else {
                        if (splitVal[0] != "" && splitVal[0] != "null") {
                            for (var j = 0; j < deliveryNoteSpliting.length; j++) {


                                newDateFieldRange.push(deliveryNoteSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                    }
                }
                if (addSiteValue == "CylScan") {
                    if (arrayCompareResultdeliveryNote.length > 0 || arrayCompareResultscm.length > 0 || arrayCompareResultqBot.length > 0 || arrayCompareResultiBot.length > 0 || arrayCompareResultdatalake.length > 0 || arrayCompareResultrpa.length > 0 || arrayCompareResultioT.length > 0 || arrayCompareResultenterprisePortal.length > 0 || arrayCompareResultAgency.length > 0  || arrayCompareResultAllProjects.length>0 || arrayCompareResultOnleave.length>0) {
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";


                    } else {
                        if (splitVal[1] != "" && splitVal[1] != "null") {
                            for (var j = 0; j < cylScanSpliting.length; j++) {


                                newDateFieldRange.push(cylScanSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                    }
                }
                if (addSiteValue == "SCM FM") {
                    if (arrayCompareResultdeliveryNote.length > 0 || arrayCompareResultcylScan.length > 0 || arrayCompareResultqBot.length > 0 || arrayCompareResultiBot.length > 0 || arrayCompareResultdatalake.length > 0 || arrayCompareResultrpa.length > 0 || arrayCompareResultioT.length > 0 || arrayCompareResultenterprisePortal.length > 0 || arrayCompareResultAgency.length > 0  || arrayCompareResultAllProjects.length>0 || arrayCompareResultOnleave.length>0) {
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";

                    } else {
                        if (splitVal[2] != "" && splitVal[2] != "null") {
                            for (var j = 0; j < scmSpliting.length; j++) {


                                newDateFieldRange.push(scmSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                    }
                }
                if (addSiteValue == "QBot") {
                    if (arrayCompareResultdeliveryNote.length > 0 || arrayCompareResultcylScan.length > 0 || arrayCompareResultscm.length > 0 || arrayCompareResultiBot.length > 0 || arrayCompareResultdatalake.length > 0 || arrayCompareResultrpa.length > 0 || arrayCompareResultioT.length > 0 || arrayCompareResultenterprisePortal.length > 0) {
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";

                    } else {
                        if (splitVal[3] != "" && splitVal[3] != "null") {
                            for (var j = 0; j < qBotSpliting.length; j++) {


                                newDateFieldRange.push(qBotSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                    }
                }
                if (addSiteValue == "IBot") {
                    if (arrayCompareResultdeliveryNote.length > 0 || arrayCompareResultcylScan.length > 0 || arrayCompareResultscm.length > 0 || arrayCompareResultqBot.length > 0 || arrayCompareResultdatalake.length > 0 || arrayCompareResultrpa.length > 0 || arrayCompareResultioT.length > 0 || arrayCompareResultenterprisePortal.length > 0 || arrayCompareResultAgency.length > 0  || arrayCompareResultAllProjects.length>0 || arrayCompareResultOnleave.length>0) {
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";

                    } else {
                        if (splitVal[4] != "" && splitVal[4] != "null") {
                            for (var j = 0; j < iBotSpliting.length; j++) {


                                newDateFieldRange.push(iBotSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                    }
                }
                if (addSiteValue == "DataLake") {
                    if (arrayCompareResultdeliveryNote.length > 0 || arrayCompareResultcylScan.length > 0 || arrayCompareResultscm.length > 0 || arrayCompareResultqBot.length > 0 || arrayCompareResultiBot.length > 0 || arrayCompareResultrpa.length > 0 || arrayCompareResultioT.length > 0 || arrayCompareResultenterprisePortal.length > 0 || arrayCompareResultAgency.length > 0  || arrayCompareResultAllProjects.length>0 || arrayCompareResultOnleave.length>0) {
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";

                    } else {
                        if (splitVal[5] != "" && splitVal[5] != "null") {
                            for (var j = 0; j < datalakeSpliting.length; j++) {


                                newDateFieldRange.push(datalakeSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                    }
                }

                if (addSiteValue == "RPA") {
                    if (arrayCompareResultdeliveryNote.length > 0 || arrayCompareResultcylScan.length > 0 || arrayCompareResultscm.length > 0 || arrayCompareResultqBot.length > 0 || arrayCompareResultiBot.length > 0 || arrayCompareResultdatalake.length > 0 || arrayCompareResultioT.length > 0 || arrayCompareResultenterprisePortal.length > 0 || arrayCompareResultAgency.length > 0  || arrayCompareResultAllProjects.length>0 || arrayCompareResultOnleave.length>0) {
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";

                    } else {
                        if (splitVal[6] != "" && splitVal[6] != "null") {
                            for (var j = 0; j < rpaSpliting.length; j++) {


                                newDateFieldRange.push(rpaSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                    }
                }
                if (addSiteValue == "IoT") {
                    if (arrayCompareResultdeliveryNote.length > 0 || arrayCompareResultcylScan.length > 0 || arrayCompareResultscm.length > 0 || arrayCompareResultqBot.length > 0 || arrayCompareResultiBot.length > 0 || arrayCompareResultdatalake.length > 0 || arrayCompareResultrpa.length > 0 || arrayCompareResultenterprisePortal.length > 0 || arrayCompareResultAgency.length > 0  || arrayCompareResultAllProjects.length>0 || arrayCompareResultOnleave.length>0) {
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";

                    } else {
                        if (splitVal[7] != "" && splitVal[7] != "null") {
                            for (var j = 0; j < ioTSpliting.length; j++) {


                                newDateFieldRange.push(ioTSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                    }
                }
                if (addSiteValue == "Enterprise Portal") {
                    if (arrayCompareResultdeliveryNote.length > 0 || arrayCompareResultcylScan.length > 0 || arrayCompareResultscm.length > 0 || arrayCompareResultqBot.length > 0 || arrayCompareResultiBot.length > 0 || arrayCompareResultdatalake.length > 0 || arrayCompareResultrpa.length > 0 || arrayCompareResultioT.length > 0 || arrayCompareResultAgency.length > 0  || arrayCompareResultAllProjects.length>0 || arrayCompareResultOnleave.length>0) {
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";

                    } else {
                        if (splitVal[8] != "" && splitVal[8] != "null") {
                            for (var j = 0; j < enterprisePortalSpliting.length; j++) {


                                newDateFieldRange.push(enterprisePortalSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                    }
                }
				if (addSiteValue == "Agency") {
                  if (arrayCompareResultdeliveryNote.length > 0 || arrayCompareResultcylScan.length > 0 || arrayCompareResultscm.length > 0 || arrayCompareResultqBot.length > 0 || arrayCompareResultiBot.length > 0 || arrayCompareResultdatalake.length > 0 || arrayCompareResultrpa.length > 0 || arrayCompareResultioT.length > 0 || arrayCompareResultenterprisePortal.length > 0  || arrayCompareResultAllProjects.length>0 || arrayCompareResultOnleave.length>0){
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";


                    } else {
                        if (splitVal[9] != "" && splitVal[9] != "null") {
                            for (var j = 0; j < agencySpliting.length; j++) {


                                newDateFieldRange.push(agencySpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                    }
                }
				if (addSiteValue == "All Projects") {
                   if (arrayCompareResultdeliveryNote.length > 0 || arrayCompareResultcylScan.length > 0 || arrayCompareResultscm.length > 0 || arrayCompareResultqBot.length > 0 || arrayCompareResultiBot.length > 0 || arrayCompareResultdatalake.length > 0 || arrayCompareResultrpa.length > 0 || arrayCompareResultioT.length > 0 || arrayCompareResultenterprisePortal.length > 0 || arrayCompareResultAgency.length > 0 || arrayCompareResultOnleave.length>0){
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";


                    } else {
                        if (splitVal[10] != "" && splitVal[10] != "null") {
                            for (var j = 0; j < allProjectsSpliting.length; j++) {


                                newDateFieldRange.push(allProjectsSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                    }
                }
				if (addSiteValue == "OnLeave") {
					if (arrayCompareResultdeliveryNote.length > 0 || arrayCompareResultcylScan.length > 0 || arrayCompareResultscm.length > 0 || arrayCompareResultqBot.length > 0 || arrayCompareResultiBot.length > 0 || arrayCompareResultdatalake.length > 0 || arrayCompareResultrpa.length > 0 || arrayCompareResultioT.length > 0 || arrayCompareResultenterprisePortal.length > 0 || arrayCompareResultAgency.length > 0  || arrayCompareResultAllProjects.length>0){
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";


                    } else {
                        if (splitVal[11] != "" && splitVal[11] != "null") {
                            for (var j = 0; j < onLeaveSpliting.length; j++) {


                                newDateFieldRange.push(onLeaveSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                    }
                }
                if (addSiteValue == "Cancel") {

                    if (arrayCompareResultdeliveryNote.length > 0) {
                        var afterRemovingNFSin = removeValues(deliveryNoteSpliting, newDateFieldRange); //singapore
                        var afterEmptyNFSin = removeEmptyValues(afterRemovingNFSin);
                        afterEmptyNFSin = afterEmptyNFSin.sort();
                        deliveryNoteDataField = afterEmptyNFSin.join(";");
                    }
                    if (arrayCompareResultcylScan.length > 0) {
                        var afterRemovingNFIn = removeValues(cylScanSpliting, newDateFieldRange); //india
                        var afterEmptyNFIn = removeEmptyValues(afterRemovingNFIn);
                        afterEmptyNFIn = afterEmptyNFIn.sort();
                        cylScanDataField = afterEmptyNFIn.join(";");
                    }
                    if (arrayCompareResultscm.length > 0) {
                        var afterRemovingNFFz = removeValues(scmSpliting, newDateFieldRange); //fuzariah
                        var afterEmptyNFFz = removeEmptyValues(afterRemovingNFFz);
                        afterEmptyNFFz = afterEmptyNFFz.sort();
                        scmDataField = afterEmptyNFFz.join(";");
                    }
                    if (arrayCompareResultqBot.length > 0) {
                        var afterRemovingNFNL = removeValues(qBotSpliting, newDateFieldRange); //NL
                        var afterEmptyNFNL = removeEmptyValues(afterRemovingNFNL);
                        afterEmptyNFNL = afterEmptyNFNL.sort();
                        qBotDataField = afterEmptyNFNL.join(";");
                    }

                    if (arrayCompareResultiBot.length > 0) {
                        var afterRemovingNFUS = removeValues(iBotSpliting, newDateFieldRange); //Us
                        var afterEmptyNFUS = removeEmptyValues(afterRemovingNFUS);
                        afterEmptyNFUS = afterEmptyNFUS.sort();
                        iBotDataField = afterEmptyNFUS.join(";");
                    }
                    if (arrayCompareResultdatalake.length > 0) {
                        var afterRemovingNFAus = removeValues(datalakeSpliting, newDateFieldRange); //Australia
                        var afterEmptyNFAus = removeEmptyValues(afterRemovingNFAus);
                        afterEmptyNFAus = afterEmptyNFAus.sort();
                        datalakeDataField = afterEmptyNFAus.join(";");
                    }

                    if (arrayCompareResultrpa.length > 0) {
                        var afterRemovingNFL = removeValues(rpaSpliting, newDateFieldRange);
                        var afterEmptyNFL = removeEmptyValues(afterRemovingNFL);
                        afterEmptyNFL = afterEmptyNFL.sort();
                        rpaDataField = afterEmptyNFL.join(";");

                    }
                    if (arrayCompareResultioT.length > 0) {
                        var afterRemovingNFP = removeValues(ioTSpliting, newDateFieldRange);
                        var afterEmptyNFP = removeEmptyValues(afterRemovingNFP);
                        afterEmptyNFP = afterEmptyNFP.sort();
                        ioTDataField = afterEmptyNFP.join(";");
                    }
                    if (arrayCompareResultenterprisePortal.length > 0) {
                        var afterRemovingNFP = removeValues(enterprisePortalSpliting, newDateFieldRange);
                        var afterEmptyNFP = removeEmptyValues(afterRemovingNFP);
                        afterEmptyNFP = afterEmptyNFP.sort();
                        enterprisePortalDataField = afterEmptyNFP.join(";");
                    }
					 if (arrayCompareResultAgency.length > 0) {
                        var afterRemovingNFA = removeValues(agencySpliting, newDateFieldRange);
                        var afterEmptyNFA = removeEmptyValues(afterRemovingNFA);
                        afterEmptyNFA = afterEmptyNFA.sort();
                        agencyDataField = afterEmptyNFA.join(";");
                    }
					 if (arrayCompareResultAllProjects.length > 0) {
                        var afterRemovingNFAA = removeValues(allProjectsSpliting, newDateFieldRange);
                        var afterEmptyNFAA = removeEmptyValues(afterRemovingNFAA);
                        afterEmptyNFAA = afterEmptyNFAA.sort();
                        allProjectsDataField = afterEmptyNFAA.join(";");
                    }
					 if (arrayCompareResultOnleave.length > 0) {
                        var afterRemovingNFOL = removeValues(onLeaveSpliting, newDateFieldRange);
                        var afterEmptyNFOL = removeEmptyValues(afterRemovingNFOL);
                        afterEmptyNFOL = afterEmptyNFOL.sort();
                        onLeaveDataField = afterEmptyNFOL.join(";");
                    }
                    addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
                }

            } else {
                addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);
            }

        });
        resultSvSb.fail(function(arg) {
            alert(arg);
        });
    } 
	else {
		if(addFieldValueText == "Choose Name" && $('.dateClass').val() == ""  && $('#roles').val() == "ChooseRole"){
        $("#bg_blocking_layer").hide();
		$('.selectedAvail').removeClass('selectedAvail');
        alert("Please select Name/Date/Role");
		}
		if(addFieldValueText == "Choose Name" && $('.dateClass').val() != "" && $('#roles').val() != "ChooseRole"){
        $("#bg_blocking_layer").hide();
		$('.selectedAvail').removeClass('selectedAvail');
        alert("Please select Name");
		}
		if(addFieldValueText != "Choose Name" && $('.dateClass').val() == "" && $('#roles').val() != "ChooseRole"){
        $("#bg_blocking_layer").hide();
		$('.selectedAvail').removeClass('selectedAvail');
        alert("Please select Date");
		}
		if(addFieldValueText != "Choose Name" && $('.dateClass').val() != "" && $('#roles').val() == "ChooseRole"){
        $("#bg_blocking_layer").hide();
		$('.selectedAvail').removeClass('selectedAvail');
        alert("Please select Role");
		}
		if(addFieldValueText == "Choose Name" && $('.dateClass').val() != "" && $('#roles').val() == "ChooseRole"){
        $("#bg_blocking_layer").hide();
		$('.selectedAvail').removeClass('selectedAvail');
        alert("Please select name and Role");
		}
		if(addFieldValueText == "Choose Name" && $('.dateClass').val() == "" && $('#roles').val() != "ChooseRole"){
        $("#bg_blocking_layer").hide();
		$('.selectedAvail').removeClass('selectedAvail');
        alert("Please select Name and Date");
		}
		if(addFieldValueText != "Choose Name" && $('.dateClass').val() == "" && $('#roles').val() == "ChooseRole"){
        $("#bg_blocking_layer").hide();
		$('.selectedAvail').removeClass('selectedAvail');
        alert("Please select Role and Date");
		}
    }

}

function removeHolidayDuplicate(arr1, arr2) {

    for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i].substring(0, 10) == arr2[j].substring(0, 10)) {

                arr2[j] = arr1[i];
            } else {
                arr2.push(arr1[i]);
            }
        }
    }
    return removeDuplicate(arr2);
}

function removeDuplicate(arr) {
    var unique_array = arr.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    return unique_array
}

function comparingTwoArrayHoliday(arr1, arr2) {
    var temparr = [];
    for (i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i].substring(0, 10) == arr2[j].substring(0, 10) && arr1[i] != "") {

                temparr.push(arr1[i]);

            }
        }

    }
    return temparr;
}

function comparingTwoArray(arr1, arr2) {

    var temparr = [];
    for (i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] == arr2[j] && arr1[i] != "") {
                temparr.push(arr1[i]);
            }
        }
    }
    return temparr;
}

function removeValues(arr1, arr2) {
    for (i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] == arr2[j]) {
                arr1[i] = "";
            }
        }
    }
    return arr1
}

function removeHolidayValues(arr1, arr2) {
    for (i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i].substring(0, 10) == arr2[j].substring(0, 10)) {
                arr1[i] = "";
            }
        }
    }
    return arr1
}

function removeEmptyValues(arr1) {
    var index = -1,
        arr_length = arr1 ? arr1.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = arr1[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}

function changingValueForSite(arr1, arr2) {
    var finalValue = "";
    var afterRemovingNFIn = removeValues(arr1, arr2); //india
    var afterEmptyNFIn = removeEmptyValues(afterRemovingNFIn);
    afterEmptyNFIn = afterEmptyNFIn.sort();
    finalValue = afterEmptyNFIn.join(";");
    return finalValue;
}

function changingValueForHolidaySite(arr1, arr2) {
    var finalValue = "";
    var afterRemovingNFIn = removeHolidayValues(arr1, arr2); //india
    var afterEmptyNFIn = removeEmptyValues(afterRemovingNFIn);
    afterEmptyNFIn = afterEmptyNFIn.sort();
    finalValue = afterEmptyNFIn.join(";");
    return finalValue;
}

function getSavedSubmitData(SiteUrl, addFieldValue, addRoleValueText, monthField, yearField) {
    dfcRetriveItem = $.Deferred();

    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('Data_ResourcePlanning');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='Name' /><Value Type='Lookup'>" + addFieldValue + "</Value></Eq><And><Eq><FieldRef Name='Role' /><Value Type='Lookup'>" + addRoleValueText + "</Value></Eq><And><Eq><FieldRef Name='Month' /><Value Type='Text'>" + monthField + "</Value></Eq><Eq><FieldRef Name='Year' /><Value Type='Text'>" + yearField + "</Value></Eq></And></And></And></Where></Query></View>");
    collListItem = oList.getItems(camlQuery);

    clientContext.load(collListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryRetrieveSucceeded), Function.createDelegate(this, this.onQueryRetrieveFailed));
    return dfcRetriveItem.promise();
}

function onQueryRetrieveSucceeded(sender, args) {

    var listSaSuInfo = '';
    var listItemEnumerator = collListItem.getEnumerator();


    while (listItemEnumerator.moveNext()) {

        var oListItem = listItemEnumerator.get_current();
        //listSaSuInfo =oListItem.get_item('Available')+":"+oListItem.get_item('PartiallyAvailable')+":"+oListItem.get_item('Leave');
        listSaSuInfo = oListItem.get_item('DeliverNote') + ":" + oListItem.get_item('CylScan') + ":" + oListItem.get_item('SCM_x0020_FM') + ":" + oListItem.get_item('QBot') + ":" + oListItem.get_item('IBot') + ":" + oListItem.get_item('DataLake') + ":" + oListItem.get_item('RPA') + ":" + oListItem.get_item('IoT') + ":" + oListItem.get_item('Enterprise_x0020_Portal')+ ":" + oListItem.get_item('Agency')+ ":" + oListItem.get_item('AllProjects')+ ":" + oListItem.get_item('OnLeave');

        itemID = oListItem.get_item('ID');


    }

    dfcRetriveItem.resolve(itemID, listSaSuInfo);
}

function onQueryRetrieveFailed(sender, args) {

    //alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcRetriveItem.reject();
}

function addDataintoList(siteMainUrl, lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField) {

    if (itemID == 0) {

        var resultAdd = addListItem(siteMainUrl, "Data_ResourcePlanning", lkaddFieldValue, lkaddRoleValue, addSiteValue, stringDate, monthField, yearField);
        resultAdd.done(function() {

            $('.dateClass').val('');

            $('#roles').val('ChooseRole');
            loadlist();

            $('.selectedAvail').removeClass('selectedAvail');

            renderInit();
            $("#bg_blocking_layer").hide();

        });
        resultAdd.fail(function(arg) {
            alert(arg);
        });
    } else {

        var resultAdd = updateListItem(siteMainUrl, "Data_ResourcePlanning", addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField);

        resultAdd.done(function() {

            $('.dateClass').val('');
            $('#roles').val('ChooseRole');
            $('#roles').val('ChooseRole');
            loadlist();
            $('.selectedAvail').removeClass('selectedAvail');
            renderInit();
            $("#bg_blocking_layer").hide();


        });
        resultAdd.fail(function(arg) {
            alert(arg);
        });

    }
}

function addListItem(siteUrl, lstName, lkaddFieldValue, lkaddRoleValue, addSiteValue, tempDate, month_value, yearField) {
    dfcAddItem = $.Deferred();
    var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(lstName);

    var itemCreateInfo = new SP.ListItemCreationInformation();

    oListItem = oList.addItem(itemCreateInfo);
    oListItem.set_item("Name", lkaddFieldValue);



    if (addSiteValue == "Delivery Note") {
        if (tempDate != "") {
			var daysDel=tempDate.split(';');
			
            oListItem.set_item("DeliverNote", tempDate);
			oListItem.set_item("DeliveryNote_Days", (daysDel.length)-1);
        } else {
            oListItem.set_item("DeliverNote", "");
        }
    }

    if (addSiteValue == "CylScan") {
        if (tempDate != "") {
			var daysDel=tempDate.split(';');
            oListItem.set_item("CylScan", tempDate);
			oListItem.set_item("CylScan_Days", (daysDel.length)-1);
        } else {
            oListItem.set_item("CylScan", "");
        }
    }

    if (addSiteValue == "SCM FM") {
        if (tempDate != "") {
			var daysDel=tempDate.split(';');
            oListItem.set_item("SCM_x0020_FM", tempDate);
			oListItem.set_item("SCM_Days", (daysDel.length)-1);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
    }
    if (addSiteValue == "QBot") {
        if (tempDate != "") {
			var daysDel=tempDate.split(';');
            oListItem.set_item("QBot", tempDate);
			oListItem.set_item("QBot_Days", (daysDel.length)-1);
        } else {
            oListItem.set_item("QBot", "");
        }
    }
    if (addSiteValue == "IBot") {
        if (tempDate != "") {
			var daysDel=tempDate.split(';');
            oListItem.set_item("IBot", tempDate);
			oListItem.set_item("IBot_Days", (daysDel.length)-1);
        } else {
            oListItem.set_item("IBot", "");
        }
    }
    if (addSiteValue == "DataLake") {
        if (tempDate != "") {
			var daysDel=tempDate.split(';');
            oListItem.set_item("DataLake", tempDate);
			oListItem.set_item("DataLake_Days", (daysDel.length)-1);
			
        } else {
            oListItem.set_item("DataLake", "");
        }
    }
    if (addSiteValue == "RPA") {
        if (tempDate != "") {
			var daysDel=tempDate.split(';');
            oListItem.set_item("RPA", tempDate);
			oListItem.set_item("RPA_Days", (daysDel.length)-1);
        } else {
            oListItem.set_item("RPA", "");
        }
    }
    if (addSiteValue == "IoT") {
        if (tempDate != "") {
			var daysDel=tempDate.split(';');
            oListItem.set_item("IoT", tempDate);
			oListItem.set_item("IoT_Days", (daysDel.length)-1);
			
        } else {
            oListItem.set_item("IoT", "");
        }
    }
    if (addSiteValue == "Enterprise Portal") {
        if (tempDate != "") {
			var daysDel=tempDate.split(';');
            oListItem.set_item("Enterprise_x0020_Portal", tempDate);
			oListItem.set_item("EnterprisePortal_Days", (daysDel.length)-1);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
    }
	if (addSiteValue == "Agency") {
        if (tempDate != "") {
			var daysDel=tempDate.split(';');
            oListItem.set_item("Agency", tempDate);
			oListItem.set_item("Agency_Days", (daysDel.length)-1);
        } else {
            oListItem.set_item("Agency", "");
        }
    }
	
	if (addSiteValue == "All Projects") {
        if (tempDate != "") {
			var daysDel=tempDate.split(';');
            oListItem.set_item("AllProjects", tempDate);
			oListItem.set_item("AllProjects_Days", (daysDel.length)-1);
        } else {
            oListItem.set_item("AllProjects", "");
        }
    }
	
	if (addSiteValue == "OnLeave") {
        if (tempDate != "") {
			var daysDel=tempDate.split(';');
            oListItem.set_item("OnLeave", tempDate);
			oListItem.set_item("OnLeave_Days", (daysDel.length)-1);
        } else {
            oListItem.set_item("OnLeave", "");
        }
    }
    oListItem.set_item("Role", lkaddRoleValue);
    oListItem.set_item("Month", month_value);
    oListItem.set_item("Year", yearField);

    oListItem.update();

    clientContext.load(oListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
    return dfcAddItem.promise();
}

function onQuerySucceeded() {


    dfcAddItem.resolve();
}

function onQueryFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcAddItem.reject();
}


function updateListItem(siteMainUrl, lstName, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, deliveryNoteDataField, cylScanDataField, scmDataField, qBotDataField, iBotDataField, datalakeDataField, rpaDataField, ioTDataField, enterprisePortalDataField,agencyDataField,allProjectsDataField,onLeaveDataField) {
    dfcUpdateItem = $.Deferred();
    var clientContext = new SP.ClientContext(siteMainUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(lstName);

    oListItem = oList.getItemById(itemID);



    if (addSiteValue == "Delivery Note") {
        if (stringDate != "" && stringDate != "null") {
			 var daysDel=stringDate.split(';');
            oListItem.set_item("DeliverNote", stringDate);
			oListItem.set_item("DeliveryNote_Days", daysDel.length);
        } else {
            oListItem.set_item("DeliverNote", "");
        }

        if (cylScanDataField != "" && cylScanDataField != "null") {
            oListItem.set_item("CylScan", cylScanDataField);
        } else {
            oListItem.set_item("CylScan", "");
        }
        if (scmDataField != "" && scmDataField != "null") {
            oListItem.set_item("SCM_x0020_FM", scmDataField);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
        if (qBotDataField != "" && qBotDataField != "null") {
            oListItem.set_item("QBot", qBotDataField);
        } else {
            oListItem.set_item("QBot", "");
        }
        if (iBotDataField != "" && iBotDataField != "null") {
            oListItem.set_item("IBot", iBotDataField);
        } else {
            oListItem.set_item("IBot", "");
        }
        if (datalakeDataField != "" && datalakeDataField != "null") {
            oListItem.set_item("DataLake", datalakeDataField);
        } else {
            oListItem.set_item("DataLake", "");
        }

        if (rpaDataField != "" && rpaDataField != "null") {
            oListItem.set_item("RPA", rpaDataField);
        } else {
            oListItem.set_item("RPA", "");
        }
        if (ioTDataField != "" && ioTDataField != "null") {
            oListItem.set_item("IoT", ioTDataField);
        } else {
            oListItem.set_item("IoT", "");
        }
        if (enterprisePortalDataField != "" && enterprisePortalDataField != "null") {
            oListItem.set_item("Enterprise_x0020_Portal", enterprisePortalDataField);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
		if (agencyDataField != "" && agencyDataField != "null") {
            oListItem.set_item("Agency", agencyDataField);
        } else {
            oListItem.set_item("Agency", "");
        }
        if (allProjectsDataField != "" && allProjectsDataField != "null") {
            oListItem.set_item("AllProjects", allProjectsDataField);
        } else {
            oListItem.set_item("AllProjects", "");
        }
		 if (onLeaveDataField != "" && onLeaveDataField != "null") {
            oListItem.set_item("OnLeave", onLeaveDataField);
        } else {
            oListItem.set_item("OnLeave", "");
        }
		
    }

    if (addSiteValue == "CylScan") {

        if (deliveryNoteDataField != "" && deliveryNoteDataField != "null") {
            oListItem.set_item("DeliverNote", deliveryNoteDataField);
        } else {
            oListItem.set_item("DeliverNote", "");
        }

        if (stringDate != "" && stringDate != "null") {
			var daysDel=stringDate.split(';');
            oListItem.set_item("CylScan", stringDate);
			oListItem.set_item("CylScan_Days", daysDel.length);
        } else {
            oListItem.set_item("CylScan", "");
        }
        if (scmDataField != "" && scmDataField != "null") {
            oListItem.set_item("SCM_x0020_FM", scmDataField);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
        if (qBotDataField != "" && qBotDataField != "null") {
            oListItem.set_item("QBot", qBotDataField);
        } else {
            oListItem.set_item("QBot", "");
        }
        if (iBotDataField != "" && iBotDataField != "null") {
            oListItem.set_item("IBot", iBotDataField);
        } else {
            oListItem.set_item("IBot", "");
        }
        if (datalakeDataField != "" && datalakeDataField != "null") {
            oListItem.set_item("DataLake", datalakeDataField);
        } else {
            oListItem.set_item("DataLake", "");
        }

        if (rpaDataField != "" && rpaDataField != "null") {
            oListItem.set_item("RPA", rpaDataField);
        } else {
            oListItem.set_item("RPA", "");
        }
        if (ioTDataField != "" && ioTDataField != "null") {
            oListItem.set_item("IoT", ioTDataField);
        } else {
            oListItem.set_item("IoT", "");
        }
        if (enterprisePortalDataField != "" && enterprisePortalDataField != "null") {
            oListItem.set_item("Enterprise_x0020_Portal", enterprisePortalDataField);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
		if (agencyDataField != "" && agencyDataField != "null") {
            oListItem.set_item("Agency", agencyDataField);
        } else {
            oListItem.set_item("Agency", "");
        }
        if (allProjectsDataField != "" && allProjectsDataField != "null") {
            oListItem.set_item("AllProjects", allProjectsDataField);
        } else {
            oListItem.set_item("AllProjects", "");
        }
		 if (onLeaveDataField != "" && onLeaveDataField != "null") {
            oListItem.set_item("OnLeave", onLeaveDataField);
        } else {
            oListItem.set_item("OnLeave", "");
        }
    }

    if (addSiteValue == "SCM FM") {
        if (deliveryNoteDataField != "" && deliveryNoteDataField != "null") {
            oListItem.set_item("DeliverNote", deliveryNoteDataField);
        } else {
            oListItem.set_item("DeliverNote", "");
        }

        if (cylScanDataField != "" && cylScanDataField != "null") {
            oListItem.set_item("CylScan", cylScanDataField);
        } else {
            oListItem.set_item("CylScan", "");
        }
        if (stringDate != "" && stringDate != "null") {
			var daysDel=stringDate.split(';');
            oListItem.set_item("SCM_x0020_FM", stringDate);

			oListItem.set_item("SCM_Days", daysDel.length);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
        if (qBotDataField != "" && qBotDataField != "null") {
            oListItem.set_item("QBot", qBotDataField);
        } else {
            oListItem.set_item("QBot", "");
        }
        if (iBotDataField != "" && iBotDataField != "null") {
            oListItem.set_item("IBot", iBotDataField);
        } else {
            oListItem.set_item("IBot", "");
        }
        if (datalakeDataField != "" && datalakeDataField != "null") {
            oListItem.set_item("DataLake", datalakeDataField);
        } else {
            oListItem.set_item("DataLake", "");
        }

        if (rpaDataField != "" && rpaDataField != "null") {
            oListItem.set_item("RPA", rpaDataField);
        } else {
            oListItem.set_item("RPA", "");
        }
        if (ioTDataField != "" && ioTDataField != "null") {
            oListItem.set_item("IoT", ioTDataField);
        } else {
            oListItem.set_item("IoT", "");
        }
        if (enterprisePortalDataField != "" && enterprisePortalDataField != "null") {
            oListItem.set_item("Enterprise_x0020_Portal", enterprisePortalDataField);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
		if (agencyDataField != "" && agencyDataField != "null") {
            oListItem.set_item("Agency", agencyDataField);
        } else {
            oListItem.set_item("Agency", "");
        }
        if (allProjectsDataField != "" && allProjectsDataField != "null") {
            oListItem.set_item("AllProjects", allProjectsDataField);
        } else {
            oListItem.set_item("AllProjects", "");
        }
		 if (onLeaveDataField != "" && onLeaveDataField != "null") {
            oListItem.set_item("OnLeave", onLeaveDataField);
        } else {
            oListItem.set_item("OnLeave", "");
        }
    }
    if (addSiteValue == "QBot") {
        if (deliveryNoteDataField != "" && deliveryNoteDataField != "null") {
            oListItem.set_item("DeliverNote", deliveryNoteDataField);
        } else {
            oListItem.set_item("DeliverNote", "");
        }

        if (cylScanDataField != "" && cylScanDataField != "null") {
            oListItem.set_item("CylScan", cylScanDataField);
        } else {
            oListItem.set_item("CylScan", "");
        }
        if (scmDataField != "" && scmDataField != "null") {
            oListItem.set_item("SCM_x0020_FM", scmDataField);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
        if (stringDate != "" && stringDate != "null") {
			var daysDel=stringDate.split(';');
            oListItem.set_item("QBot", stringDate);

			oListItem.set_item("QBot_Days", daysDel.length);
        } else {
            oListItem.set_item("QBot", "");
        }
        if (iBotDataField != "" && iBotDataField != "null") {
            oListItem.set_item("IBot", iBotDataField);
        } else {
            oListItem.set_item("IBot", "");
        }
        if (datalakeDataField != "" && datalakeDataField != "null") {
            oListItem.set_item("DataLake", datalakeDataField);
        } else {
            oListItem.set_item("DataLake", "");
        }

        if (rpaDataField != "" && rpaDataField != "null") {
            oListItem.set_item("RPA", rpaDataField);
        } else {
            oListItem.set_item("RPA", "");
        }
        if (ioTDataField != "" && ioTDataField != "null") {
            oListItem.set_item("IoT", ioTDataField);
        } else {
            oListItem.set_item("IoT", "");
        }
        if (enterprisePortalDataField != "" && enterprisePortalDataField != "null") {
            oListItem.set_item("Enterprise_x0020_Portal", enterprisePortalDataField);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
		if (agencyDataField != "" && agencyDataField != "null") {
            oListItem.set_item("Agency", agencyDataField);
        } else {
            oListItem.set_item("Agency", "");
        }
        if (allProjectsDataField != "" && allProjectsDataField != "null") {
            oListItem.set_item("AllProjects", allProjectsDataField);
        } else {
            oListItem.set_item("AllProjects", "");
        }
		 if (onLeaveDataField != "" && onLeaveDataField != "null") {
            oListItem.set_item("OnLeave", onLeaveDataField);
        } else {
            oListItem.set_item("OnLeave", "");
        }
    }
    if (addSiteValue == "IBot") {
        if (deliveryNoteDataField != "" && deliveryNoteDataField != "null") {
            oListItem.set_item("DeliverNote", deliveryNoteDataField);
        } else {
            oListItem.set_item("DeliverNote", "");
        }

        if (cylScanDataField != "" && cylScanDataField != "null") {
            oListItem.set_item("CylScan", cylScanDataField);
        } else {
            oListItem.set_item("CylScan", "");
        }
        if (scmDataField != "" && scmDataField != "null") {
            oListItem.set_item("SCM_x0020_FM", scmDataField);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
        if (qBotDataField != "" && qBotDataField != "null") {
            oListItem.set_item("QBot", qBotDataField);
        } else {
            oListItem.set_item("QBot", "");
        }
        if (stringDate != "" && stringDate != "null") {
			var daysDel=stringDate.split(';');
            oListItem.set_item("IBot", stringDate);

			oListItem.set_item("IBot_Days", daysDel.length);
        } else {
            oListItem.set_item("IBot", "");
        }
        if (datalakeDataField != "" && datalakeDataField != "null") {
            oListItem.set_item("DataLake", datalakeDataField);
        } else {
            oListItem.set_item("DataLake", "");
        }

        if (rpaDataField != "" && rpaDataField != "null") {
            oListItem.set_item("RPA", rpaDataField);
        } else {
            oListItem.set_item("RPA", "");
        }
        if (ioTDataField != "" && ioTDataField != "null") {
            oListItem.set_item("IoT", ioTDataField);
        } else {
            oListItem.set_item("IoT", "");
        }
        if (enterprisePortalDataField != "" && enterprisePortalDataField != "null") {
            oListItem.set_item("Enterprise_x0020_Portal", enterprisePortalDataField);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
		if (agencyDataField != "" && agencyDataField != "null") {
            oListItem.set_item("Agency", agencyDataField);
        } else {
            oListItem.set_item("Agency", "");
        }
        if (allProjectsDataField != "" && allProjectsDataField != "null") {
            oListItem.set_item("AllProjects", allProjectsDataField);
        } else {
            oListItem.set_item("AllProjects", "");
        }
		 if (onLeaveDataField != "" && onLeaveDataField != "null") {
            oListItem.set_item("OnLeave", onLeaveDataField);
        } else {
            oListItem.set_item("OnLeave", "");
        }
    }
    if (addSiteValue == "DataLake") {
        if (deliveryNoteDataField != "" && deliveryNoteDataField != "null") {
            oListItem.set_item("DeliverNote", deliveryNoteDataField);
        } else {
            oListItem.set_item("DeliverNote", "");
        }

        if (cylScanDataField != "" && cylScanDataField != "null") {
            oListItem.set_item("CylScan", cylScanDataField);
        } else {
            oListItem.set_item("CylScan", "");
        }
        if (scmDataField != "" && scmDataField != "null") {
            oListItem.set_item("SCM_x0020_FM", scmDataField);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
        if (qBotDataField != "" && qBotDataField != "null") {
            oListItem.set_item("QBot", qBotDataField);
        } else {
            oListItem.set_item("QBot", "");
        }
        if (iBotDataField != "" && iBotDataField != "null") {
            oListItem.set_item("IBot", iBotDataField);
        } else {
            oListItem.set_item("IBot", "");
        }
        if (stringDate != "" && stringDate != "null") {
			var daysDel=stringDate.split(';');
            oListItem.set_item("DataLake", stringDate);
			
			oListItem.set_item("DataLake_Days", daysDel.length);
        } else {
            oListItem.set_item("DataLake", "");
        }

        if (rpaDataField != "" && rpaDataField != "null") {
            oListItem.set_item("RPA", rpaDataField);
        } else {
            oListItem.set_item("RPA", "");
        }
        if (ioTDataField != "" && ioTDataField != "null") {
            oListItem.set_item("IoT", ioTDataField);
        } else {
            oListItem.set_item("IoT", "");
        }
        if (enterprisePortalDataField != "" && enterprisePortalDataField != "null") {
            oListItem.set_item("Enterprise_x0020_Portal", enterprisePortalDataField);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
		if (agencyDataField != "" && agencyDataField != "null") {
            oListItem.set_item("Agency", agencyDataField);
        } else {
            oListItem.set_item("Agency", "");
        }
        if (allProjectsDataField != "" && allProjectsDataField != "null") {
            oListItem.set_item("AllProjects", allProjectsDataField);
        } else {
            oListItem.set_item("AllProjects", "");
        }
		 if (onLeaveDataField != "" && onLeaveDataField != "null") {
            oListItem.set_item("OnLeave", onLeaveDataField);
        } else {
            oListItem.set_item("OnLeave", "");
        }
    }
    if (addSiteValue == "RPA") {
        if (deliveryNoteDataField != "" && deliveryNoteDataField != "null") {
            oListItem.set_item("DeliverNote", deliveryNoteDataField);
        } else {
            oListItem.set_item("DeliverNote", "");
        }

        if (cylScanDataField != "" && cylScanDataField != "null") {
            oListItem.set_item("CylScan", cylScanDataField);
        } else {
            oListItem.set_item("CylScan", "");
        }
        if (scmDataField != "" && scmDataField != "null") {
            oListItem.set_item("SCM_x0020_FM", scmDataField);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
        if (qBotDataField != "" && qBotDataField != "null") {
            oListItem.set_item("QBot", qBotDataField);
        } else {
            oListItem.set_item("QBot", "");
        }
        if (iBotDataField != "" && iBotDataField != "null") {
            oListItem.set_item("IBot", iBotDataField);
        } else {
            oListItem.set_item("IBot", "");
        }
        if (datalakeDataField != "" && datalakeDataField != "null") {
            oListItem.set_item("DataLake", datalakeDataField);
        } else {
            oListItem.set_item("DataLake", "");
        }

        if (stringDate != "" && stringDate != "null") {
			var daysDel=stringDate.split(';');
            oListItem.set_item("RPA", stringDate);
			
			oListItem.set_item("RPA_Days", daysDel.length);
        } else {
            oListItem.set_item("RPA", "");
        }
        if (ioTDataField != "" && ioTDataField != "null") {
            oListItem.set_item("IoT", ioTDataField);
        } else {
            oListItem.set_item("IoT", "");
        }
        if (enterprisePortalDataField != "" && enterprisePortalDataField != "null") {
            oListItem.set_item("Enterprise_x0020_Portal", enterprisePortalDataField);
			
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
		if (agencyDataField != "" && agencyDataField != "null") {
            oListItem.set_item("Agency", agencyDataField);
        } else {
            oListItem.set_item("Agency", "");
        }
        if (allProjectsDataField != "" && allProjectsDataField != "null") {
            oListItem.set_item("AllProjects", allProjectsDataField);
        } else {
            oListItem.set_item("AllProjects", "");
        }
		 if (onLeaveDataField != "" && onLeaveDataField != "null") {
            oListItem.set_item("OnLeave", onLeaveDataField);
        } else {
            oListItem.set_item("OnLeave", "");
        }
    }
    if (addSiteValue == "IoT") {
        if (deliveryNoteDataField != "" && deliveryNoteDataField != "null") {
            oListItem.set_item("DeliverNote", deliveryNoteDataField);
        } else {
            oListItem.set_item("DeliverNote", "");
        }

        if (cylScanDataField != "" && cylScanDataField != "null") {
            oListItem.set_item("CylScan", cylScanDataField);
        } else {
            oListItem.set_item("CylScan", "");
        }
        if (scmDataField != "" && scmDataField != "null") {
            oListItem.set_item("SCM_x0020_FM", scmDataField);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
        if (qBotDataField != "" && qBotDataField != "null") {
            oListItem.set_item("QBot", qBotDataField);
        } else {
            oListItem.set_item("QBot", "");
        }
        if (iBotDataField != "" && iBotDataField != "null") {
            oListItem.set_item("IBot", iBotDataField);
        } else {
            oListItem.set_item("IBot", "");
        }
        if (datalakeDataField != "" && datalakeDataField != "null") {
            oListItem.set_item("DataLake", datalakeDataField);
        } else {
            oListItem.set_item("DataLake", "");
        }

        if (rpaDataField != "" && rpaDataField != "null") {
            oListItem.set_item("RPA", rpaDataField);
        } else {
            oListItem.set_item("RPA", "");
        }
        if (stringDate != "" && stringDate != "null") {
			var daysDel=stringDate.split(';');
            oListItem.set_item("IoT", stringDate);
			
			oListItem.set_item("IoT_Days", daysDel.length);
			
        } else {
            oListItem.set_item("IoT", "");
        }
        if (enterprisePortalDataField != "" && enterprisePortalDataField != "null") {
            oListItem.set_item("Enterprise_x0020_Portal", enterprisePortalDataField);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
		if (agencyDataField != "" && agencyDataField != "null") {
			 oListItem.set_item("Agency", agencyDataField);
        } else {
            oListItem.set_item("Agency", "");
        }
        if (allProjectsDataField != "" && allProjectsDataField != "null") {
            oListItem.set_item("AllProjects", allProjectsDataField);
			
        } else {
            oListItem.set_item("AllProjects", "");
        }
		 if (onLeaveDataField != "" && onLeaveDataField != "null") {
            oListItem.set_item("OnLeave", onLeaveDataField);
        } else {
            oListItem.set_item("OnLeave", "");
        }
    }
    if (addSiteValue == "Enterprise Portal") {
        if (deliveryNoteDataField != "" && deliveryNoteDataField != "null") {
            oListItem.set_item("DeliverNote", deliveryNoteDataField);
        } else {
            oListItem.set_item("DeliverNote", "");
        }

        if (cylScanDataField != "" && cylScanDataField != "null") {
            oListItem.set_item("CylScan", cylScanDataField);
        } else {
            oListItem.set_item("CylScan", "");
        }
        if (scmDataField != "" && scmDataField != "null") {
            oListItem.set_item("SCM_x0020_FM", scmDataField);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
        if (qBotDataField != "" && qBotDataField != "null") {
            oListItem.set_item("QBot", qBotDataField);
        } else {
            oListItem.set_item("QBot", "");
        }
        if (iBotDataField != "" && iBotDataField != "null") {
            oListItem.set_item("IBot", iBotDataField);
        } else {
            oListItem.set_item("IBot", "");
        }
        if (datalakeDataField != "" && datalakeDataField != "null") {
            oListItem.set_item("DataLake", datalakeDataField);
        } else {
            oListItem.set_item("DataLake", "");
        }

        if (rpaDataField != "" && rpaDataField != "null") {
            oListItem.set_item("RPA", rpaDataField);
        } else {
            oListItem.set_item("RPA", "");
        }
        if (ioTDataField != "" && ioTDataField != "null") {
            oListItem.set_item("IoT", ioTDataField);
        } else {
            oListItem.set_item("IoT", "");
        }
        if (stringDate != "" && stringDate != "null") {
            oListItem.set_item("Enterprise_x0020_Portal", stringDate);
			var daysDel=stringDate.split(';');
			oListItem.set_item("EnterprisePortal_Days", daysDel.length);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
		if (agencyDataField != "" && agencyDataField != "null") {
            oListItem.set_item("Agency", agencyDataField);
        } else {
            oListItem.set_item("Agency", "");
        }
        if (allProjectsDataField != "" && allProjectsDataField != "null") {
            oListItem.set_item("AllProjects", allProjectsDataField);
        } else {
            oListItem.set_item("AllProjects", "");
        }
		 if (onLeaveDataField != "" && onLeaveDataField != "null") {
            oListItem.set_item("OnLeave", onLeaveDataField);
        } else {
            oListItem.set_item("OnLeave", "");
        }
    }
	    if (addSiteValue == "Agency") {
        if (deliveryNoteDataField != "" && deliveryNoteDataField != "null") {
            oListItem.set_item("DeliverNote", deliveryNoteDataField);
        } else {
            oListItem.set_item("DeliverNote", "");
        }

        if (cylScanDataField != "" && cylScanDataField != "null") {
            oListItem.set_item("CylScan", cylScanDataField);
        } else {
            oListItem.set_item("CylScan", "");
        }
        if (scmDataField != "" && scmDataField != "null") {
            oListItem.set_item("SCM_x0020_FM", scmDataField);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
        if (qBotDataField != "" && qBotDataField != "null") {
            oListItem.set_item("QBot", qBotDataField);
        } else {
            oListItem.set_item("QBot", "");
        }
        if (iBotDataField != "" && iBotDataField != "null") {
            oListItem.set_item("IBot", iBotDataField);
        } else {
            oListItem.set_item("IBot", "");
        }
        if (datalakeDataField != "" && datalakeDataField != "null") {
            oListItem.set_item("DataLake", datalakeDataField);
        } else {
            oListItem.set_item("DataLake", "");
        }

        if (rpaDataField != "" && rpaDataField != "null") {
            oListItem.set_item("RPA", rpaDataField);
        } else {
            oListItem.set_item("RPA", "");
        }
        if (ioTDataField != "" && ioTDataField != "null") {
            oListItem.set_item("IoT", ioTDataField);
        } else {
            oListItem.set_item("IoT", "");
        }
		if (enterprisePortalDataField != "" && enterprisePortalDataField != "null") {
            oListItem.set_item("Enterprise_x0020_Portal", enterprisePortalDataField);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
        if (stringDate != "" && stringDate != "null") {
			var daysDel=stringDate.split(';');
            oListItem.set_item("Agency", stringDate);
			oListItem.set_item("Agency_Days", daysDel.length);
        } else {
            oListItem.set_item("Agency", "");
        }
		
        if (allProjectsDataField != "" && allProjectsDataField != "null") {
            oListItem.set_item("AllProjects", allProjectsDataField);
        } else {
            oListItem.set_item("AllProjects", "");
        }
		 if (onLeaveDataField != "" && onLeaveDataField != "null") {
            oListItem.set_item("OnLeave", onLeaveDataField);
        } else {
            oListItem.set_item("OnLeave", "");
        }
    }
	
	if (addSiteValue == "All Projects") {
        if (deliveryNoteDataField != "" && deliveryNoteDataField != "null") {
            oListItem.set_item("DeliverNote", deliveryNoteDataField);
        } else {
            oListItem.set_item("DeliverNote", "");
        }

        if (cylScanDataField != "" && cylScanDataField != "null") {
            oListItem.set_item("CylScan", cylScanDataField);
        } else {
            oListItem.set_item("CylScan", "");
        }
        if (scmDataField != "" && scmDataField != "null") {
            oListItem.set_item("SCM_x0020_FM", scmDataField);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
        if (qBotDataField != "" && qBotDataField != "null") {
            oListItem.set_item("QBot", qBotDataField);
        } else {
            oListItem.set_item("QBot", "");
        }
        if (iBotDataField != "" && iBotDataField != "null") {
            oListItem.set_item("IBot", iBotDataField);
        } else {
            oListItem.set_item("IBot", "");
        }
        if (datalakeDataField != "" && datalakeDataField != "null") {
            oListItem.set_item("DataLake", datalakeDataField);
        } else {
            oListItem.set_item("DataLake", "");
        }

        if (rpaDataField != "" && rpaDataField != "null") {
            oListItem.set_item("RPA", rpaDataField);
        } else {
            oListItem.set_item("RPA", "");
        }
        if (ioTDataField != "" && ioTDataField != "null") {
            oListItem.set_item("IoT", ioTDataField);
        } else {
            oListItem.set_item("IoT", "");
        }
		if (enterprisePortalDataField != "" && enterprisePortalDataField != "null") {
            oListItem.set_item("Enterprise_x0020_Portal", enterprisePortalDataField);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
		if (agencyDataField != "" && agencyDataField != "null") {
            oListItem.set_item("Agency", agencyDataField);
        } else {
            oListItem.set_item("Agency", "");
        }
        if (stringDate != "" && stringDate != "null") {
            oListItem.set_item("AllProjects", stringDate);
			var daysDel=stringDate.split(';');
			oListItem.set_item("AllProjects_Days", daysDel.length);
        } else {
            oListItem.set_item("AllProjects", "");
        }
		
		 if (onLeaveDataField != "" && onLeaveDataField != "null") {
            oListItem.set_item("OnLeave", onLeaveDataField);
        } else {
            oListItem.set_item("OnLeave", "");
        }
		
    }
	
	if (addSiteValue == "OnLeave") {
        if (deliveryNoteDataField != "" && deliveryNoteDataField != "null") {
            oListItem.set_item("DeliverNote", deliveryNoteDataField);
        } else {
            oListItem.set_item("DeliverNote", "");
        }

        if (cylScanDataField != "" && cylScanDataField != "null") {
            oListItem.set_item("CylScan", cylScanDataField);
        } else {
            oListItem.set_item("CylScan", "");
        }
        if (scmDataField != "" && scmDataField != "null") {
            oListItem.set_item("SCM_x0020_FM", scmDataField);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
        }
        if (qBotDataField != "" && qBotDataField != "null") {
            oListItem.set_item("QBot", qBotDataField);
        } else {
            oListItem.set_item("QBot", "");
        }
        if (iBotDataField != "" && iBotDataField != "null") {
            oListItem.set_item("IBot", iBotDataField);
        } else {
            oListItem.set_item("IBot", "");
        }
        if (datalakeDataField != "" && datalakeDataField != "null") {
            oListItem.set_item("DataLake", datalakeDataField);
        } else {
            oListItem.set_item("DataLake", "");
        }

        if (rpaDataField != "" && rpaDataField != "null") {
            oListItem.set_item("RPA", rpaDataField);
        } else {
            oListItem.set_item("RPA", "");
        }
        if (ioTDataField != "" && ioTDataField != "null") {
            oListItem.set_item("IoT", ioTDataField);
        } else {
            oListItem.set_item("IoT", "");
        }
		if (enterprisePortalDataField != "" && enterprisePortalDataField != "null") {
            oListItem.set_item("Enterprise_x0020_Portal", enterprisePortalDataField);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
        }
		if (agencyDataField != "" && agencyDataField != "null") {
            oListItem.set_item("Agency", agencyDataField);
        } else {
            oListItem.set_item("Agency", "");
        }
        if (allProjectsDataField != "" && allProjectsDataField != "null") {
            oListItem.set_item("AllProjects", allProjectsDataField);
        } else {
            oListItem.set_item("AllProjects", "");
        }
		 if (stringDate != "" && stringDate != "null") {
            oListItem.set_item("OnLeave", stringDate);
			var daysDel=stringDate.split(';');
			oListItem.set_item("OnLeave_Days", daysDel.length);
        } else {
            oListItem.set_item("OnLeave", "");
        }
    }
	
    if (addSiteValue == "Cancel") {

        if (deliveryNoteDataField != "" && deliveryNoteDataField != "null") {
			 var daysDel=deliveryNoteDataField.split(';');
			oListItem.set_item("DeliverNote", deliveryNoteDataField);
			oListItem.set_item("DeliveryNote_Days", daysDel.length);
			}
         else {
            oListItem.set_item("DeliverNote", "");
			oListItem.set_item("DeliveryNote_Days","");

        }

        if (cylScanDataField != "" && cylScanDataField != "null") {
			 var daysDel=cylScanDataField.split(';');
            oListItem.set_item("CylScan", cylScanDataField);
			oListItem.set_item("CylScan_Days", daysDel.length);
        } else {
            oListItem.set_item("CylScan", "");
			oListItem.set_item("CylScan_Days", "");
        }
        if (scmDataField != "" && scmDataField != "null") {
			var daysDel=scmDataField.split(';');
            oListItem.set_item("SCM_x0020_FM", scmDataField);
			oListItem.set_item("SCM_Days", daysDel.length);
        } else {
            oListItem.set_item("SCM_x0020_FM", "");
			oListItem.set_item("SCM_Days", "");
        }
        if (qBotDataField != "" && qBotDataField != "null") {
			var daysDel=qBotDataField.split(';');
            oListItem.set_item("QBot", qBotDataField);
			oListItem.set_item("QBot_Days", daysDel.length);
        } else {
            oListItem.set_item("QBot", "");
			oListItem.set_item("QBot_Days", "");
        }
        if (iBotDataField != "" && iBotDataField != "null") {
			var daysDel=iBotDataField.split(';');
            oListItem.set_item("IBot", iBotDataField);
			oListItem.set_item("IBot_Days", daysDel.length);
        } else {
            oListItem.set_item("IBot", "");
			oListItem.set_item("IBot_Days","");
        }
        if (datalakeDataField != "" && datalakeDataField != "null") {
			var daysDel=datalakeDataField.split(';');
            oListItem.set_item("DataLake", datalakeDataField);
			oListItem.set_item("DataLake_Days", daysDel.length);
        } else {
            oListItem.set_item("DataLake", "");
			oListItem.set_item("DataLake_Days", "");
        }

        if (rpaDataField != "" && rpaDataField != "null") {
			var daysDel=rpaDataField.split(';');
            oListItem.set_item("RPA", rpaDataField);
			oListItem.set_item("RPA_Days", daysDel.length);
        } else {
            oListItem.set_item("RPA", "");
			oListItem.set_item("RPA_Days", "");
        }
        if (ioTDataField != "" && ioTDataField != "null") {
			var daysDel=ioTDataField.split(';');
            oListItem.set_item("IoT", ioTDataField);
			oListItem.set_item("IoT_Days", daysDel.length);
        } else {
            oListItem.set_item("IoT", "");
			oListItem.set_item("IoT_Days", "");
        }
        if (enterprisePortalDataField != "" && enterprisePortalDataField != "null") {
			var daysDel=enterprisePortalDataField.split(';');
            oListItem.set_item("Enterprise_x0020_Portal", enterprisePortalDataField);
			oListItem.set_item("EnterprisePortal_Days", daysDel.length);
        } else {
            oListItem.set_item("Enterprise_x0020_Portal", "");
			oListItem.set_item("EnterprisePortal_Days", "");
        }
		if (agencyDataField != "" && agencyDataField != "null") {
			var daysDel=agencyDataField.split(';');
            oListItem.set_item("Agency", agencyDataField);
			oListItem.set_item("Agency_Days", daysDel.length);
        } else {
            oListItem.set_item("Agency", "");
			oListItem.set_item("Agency_Days", "");
        }
        if (allProjectsDataField != "" && allProjectsDataField != "null") {
			var daysDel=allProjectsDataField.split(';');
            oListItem.set_item("AllProjects", allProjectsDataField);
			oListItem.set_item("AllProjects_Days", daysDel.length);
        } else {
            oListItem.set_item("AllProjects", "");
        }
		 if (onLeaveDataField != "" && onLeaveDataField != "null") {
			 var daysDel=onLeaveDataField.split(';');
            oListItem.set_item("OnLeave", onLeaveDataField);
			oListItem.set_item("OnLeave_Days", daysDel.length);
        } else {
            oListItem.set_item("OnLeave", "");
			oListItem.set_item("OnLeave_Days", "");
        }
    }

    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryUpdateSucceeded), Function.createDelegate(this, this.onQueryUpdateFailed));
    return dfcUpdateItem.promise();
}

function onQueryUpdateSucceeded() {
    //alert('Item updated!');
    dfcUpdateItem.resolve();
}

function onQueryUpdateFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcUpdateItem.reject();
}

function addHolidayListItem(siteUrl, lstName, addHolidayValue, stringDateHoliday, monthfield, yearField) {
    dfcAddHolidayItem = $.Deferred();
    var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(lstName);

    var itemCreateInfo = new SP.ListItemCreationInformation();

    oListItem = oList.addItem(itemCreateInfo);



    var i = stringDateHoliday.indexOf(';');
    if (i == 0) {
        stringDateHoliday = stringDateHoliday.substring(1);
    }

    if (addHolidayValue == "SingaporeHoliday") {
        if (stringDateHoliday != "") {
            oListItem.set_item("SingaporeHoliday", stringDateHoliday);
        } else {
            oListItem.set_item("SingaporeHoliday", "");
        }
    }

    if (addHolidayValue == "FujairahHoliday") {
        if (stringDateHoliday != "") {
            oListItem.set_item("FujairahHoliday", stringDateHoliday);
        } else {
            oListItem.set_item("FujairahHoliday", "");
        }
    }
	
	if (addHolidayValue == "IndiaHoliday") {
        if (stringDateHoliday != "") {
            oListItem.set_item("IndiaHoliday", stringDateHoliday);
        } else {
            oListItem.set_item("IndiaHoliday", "");
        }
    }

    oListItem.set_item("Month", monthfield);
    oListItem.set_item("Year", yearField);

    oListItem.update();

    clientContext.load(oListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryHolidaySucceeded), Function.createDelegate(this, this.onQueryHolidayFailed));
    return dfcAddHolidayItem.promise();
}

function onQueryHolidaySucceeded() {


    dfcAddHolidayItem.resolve();
}

function onQueryHolidayFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcAddHolidayItem.reject();
}

function updateHolidayListItem(siteMainUrl, lstName, addHolidayValue, stringDate, monthField, yearField, itemID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField) {
    dfcUpdateHolidayItem = $.Deferred();
    var clientContext = new SP.ClientContext(siteMainUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(lstName);

    oListItem = oList.getItemById(itemID);

    var i = stringDate.indexOf(';');
    if (i == 0) {
        stringDate = stringDate.substring(1);
    }

    if (addHolidayValue == "SingaporeHoliday") {
        if (stringDate != "" && stringDate != "null") {
            oListItem.set_item("SingaporeHoliday", stringDate);
        } else {
            oListItem.set_item("SingaporeHoliday", "");
        }

        if (fuzariahHolidayDataField != "" && fuzariahHolidayDataField != "null") {
            oListItem.set_item("FujairahHoliday", fuzariahHolidayDataField);
        } else {
            oListItem.set_item("FujairahHoliday", "");
        }
		
		if (indiaHolidayDataField != "" && indiaHolidayDataField != "null") {
            oListItem.set_item("IndiaHoliday", indiaHolidayDataField);
        } else {
            oListItem.set_item("IndiaHoliday", "");
        }

    }
    if (addHolidayValue == "FujairahHoliday") {
        if (singaporeHolidayDataField!= "" && singaporeHolidayDataField!= "null") {
            oListItem.set_item("SingaporeHoliday", singaporeHolidayDataField);
        } else {
            oListItem.set_item("SingaporeHoliday", "");
        }

        if (stringDate!= "" && stringDate!= "null") {
            oListItem.set_item("FujairahHoliday", stringDate);
        } else {
            oListItem.set_item("FujairahHoliday", "");
        }
		if (indiaHolidayDataField!= "" && indiaHolidayDataField!= "null") {
            oListItem.set_item("IndiaHoliday", indiaHolidayDataField);
        } else {
            oListItem.set_item("IndiaHoliday", "");
        }
    }
	if (addHolidayValue == "IndiaHoliday") {
       if (singaporeHolidayDataField!= "" && singaporeHolidayDataField!= "null") {
            oListItem.set_item("SingaporeHoliday", singaporeHolidayDataField);
        } else {
            oListItem.set_item("SingaporeHoliday", "");
        }

        if (fuzariahHolidayDataField != "" && fuzariahHolidayDataField != "null") {
            oListItem.set_item("FujairahHoliday", fuzariahHolidayDataField);
        } else {
            oListItem.set_item("FujairahHoliday", "");
        }
		 if (stringDate!= "" && stringDate!= "null") {
            oListItem.set_item("IndiaHoliday", stringDate);
        } else {
            oListItem.set_item("IndiaHoliday", "");
        }

    }
    if (addHolidayValue == "Cancel"){
        if (singaporeHolidayDataField != "" && singaporeHolidayDataField != "null") {
            oListItem.set_item("SingaporeHoliday", singaporeHolidayDataField);
        } else {
            oListItem.set_item("SingaporeHoliday", "");
        }

        if (fuzariahHolidayDataField != "" && fuzariahHolidayDataField != "null") {
            oListItem.set_item("FujairahHoliday", fuzariahHolidayDataField);
        } else {
            oListItem.set_item("FujairahHoliday", "");
        }
		
		if (indiaHolidayDataField != "" && indiaHolidayDataField != "null") {
            oListItem.set_item("IndiaHoliday", indiaHolidayDataField);
        } else {
            oListItem.set_item("IndiaHoliday", "");
        }

    }
    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryUpdateHolidaySucceeded), Function.createDelegate(this, this.onQueryUpdateHolidayFailed));
    return dfcUpdateHolidayItem.promise();
}

function onQueryUpdateHolidaySucceeded() {
    //alert('Item updated!');
    dfcUpdateHolidayItem.resolve();
}

function onQueryUpdateHolidayFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcUpdateHolidayItem.reject();
}

function getSavedHolidayData(SiteUrl, monthField, yearField) {
    dfcRetriveHolidayItem = $.Deferred();

    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('HolidayData_ResourcePlanning');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='Month' /><Value Type='Text'>" + monthField + "</Value></Eq><Eq><FieldRef Name='Year' /><Value Type='Text'>" + yearField + "</Value></Eq></And></Where></Query></View>");
    collListItem = oList.getItems(camlQuery);

    clientContext.load(collListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryRetrieveHolidaySucceeded), Function.createDelegate(this, this.onQueryRetrieveHolidayFailed));
    return dfcRetriveHolidayItem.promise();
}

function onQueryRetrieveHolidaySucceeded(sender, args) {

    var listSaSuInfo = '';
    var listItemEnumerator = collListItem.getEnumerator();


    while (listItemEnumerator.moveNext()) {

        var oListItem = listItemEnumerator.get_current();
        //listSaSuInfo =oListItem.get_item('Available')+":"+oListItem.get_item('PartiallyAvailable')+":"+oListItem.get_item('Leave');
        listSaSuInfo = oListItem.get_item('SingaporeHoliday') + ":" + oListItem.get_item('FujairahHoliday')+ ":" + oListItem.get_item('IndiaHoliday');

        itemHolidayID = oListItem.get_item('ID');


    }

    dfcRetriveHolidayItem.resolve(itemHolidayID, listSaSuInfo);
}
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = ((today - onejan + 1) / 86400000);
    return Math.ceil(dayOfYear / 7)
};

function renderInit() {

    $("#bg_blocking_layer").show();
    if (renderStartDate == "" || renderStartDate == null) {
        var param1 = new Date();

    } else {
        var param1 = renderStartDate;
    }
    $('.datepickerInput').datepicker("setDate", param1);
    var days = param1.getDaysInMonth();
    param1.setDate(1);
    var startDay = param1;
    $('.renderTable').remove();
    $('.renderData').remove();

    var weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    var yearFieldCheck = "";
    var monthFieldCheck = "";
    var yearDate = param1.getFullYear();
    var monthCheck = param1.getMonth();
    var monthStartDay = new Date(param1.getFullYear(), param1.getMonth(), 1);
    var monthEndDay = new Date(param1.getFullYear(), param1.getMonth() + 1, 0);
    var weekNumStart = monthStartDay.getWeek();
    var weekNumEnd = monthEndDay.getWeek();
    var WeekFieldCheck = "";
    var monthDate = months[monthCheck];

    //var renderTableHTML='<div class="renderData" ><div class="yearDate" style="margin-left: 26px;">Year&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;&nbsp;<label for="year" class="yearLabel" style="margin-top:3px;">'+yearDate+'</label>Month :&nbsp;&nbsp;<label for="month" class="monthLabel" style="margin-top:3px;" >'+monthDate+'</label>Week&nbsp; :&nbsp;&nbsp;<label for="week" class="weekLabel" style="margin-top:3px;">'+weekNumStart+'-'+weekNumEnd+'</label></div>';
    var renderTableHTML = '<div class="renderData yearDate"><table><tr style="margin-left: 26px;"><td style="padding-left:5px;">Year  :</td><td>' + yearDate + '</td><td style="padding-left:300px;">Month  :</td><td>' + monthDate + '</td><td style="padding-left:219px;">Week  :</td><td>' + weekNumStart + '-' + weekNumEnd + '</td></tr></table></div>';
    renderTableHTML += "<table class='renderTable'><tr>";
    renderMonthTdHTML = "";
    renderTableHTML += '<th style="font-size:16px;width:90%">EmployeeName&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>';
    for (var startDate = 1; startDate <= days; startDate++) {
        var currentDate = new Date(startDay);
        var monthDate = currentDate.getMonth();
        // var yearDate=currentDate.getFullYear();

        // var monthFieldName=monthName[monthDate];

        var weekday = weekdays[currentDate.getDay()];
        if (startDate < 10) {
            if (weekday == "S") {
                renderTableHTML += '<th class="row ' + startDay.format("MM/dd/yyyy") + '" type="text" name="fname" placeholder="' + startDate + '" disabled style="font-size:13px;text-align:center;">' + '0' + startDate + ' </br>' + weekday + ' </th>';
                renderMonthTdHTML += '<td class="data ' + startDay.format("MM/dd/yyyy") + '" style="background-color:#6fce5c !important;"></td>';
                startDay.addDays(1);
            } else {
                renderTableHTML += '<th class="row ' + startDay.format("MM/dd/yyyy") + '" type="text" name="fname" placeholder="' + startDate + '" disabled style="font-size:13px;text-align:center;">' + '0' + startDate + ' </br>' + weekday + ' </th>';
                renderMonthTdHTML += '<td class="data ' + startDay.format("MM/dd/yyyy") + '"></td>';
                startDay.addDays(1);
            }
        } else {
            if (weekday == "S") {
                renderTableHTML += '<th class="row ' + startDay.format("MM/dd/yyyy") + '" type="text" name="fname" placeholder="' + startDate + '" disabled style="font-size:13px;text-align:center;">' + startDate + ' </br>' + weekday + ' </th>';
                renderMonthTdHTML += '<td class="data ' + startDay.format("MM/dd/yyyy") + '" style="background-color:#6fce5c !important;"></td>';
                startDay.addDays(1);
            } else {
                renderTableHTML += '<th class="row ' + startDay.format("MM/dd/yyyy") + '" type="text" name="fname" placeholder="' + startDate + '" disabled style="font-size:13px;text-align:center;">' + startDate + ' </br>' + weekday + ' </th>';
                renderMonthTdHTML += '<td class="data ' + startDay.format("MM/dd/yyyy") + '"></td>';
                startDay.addDays(1);
            }
        }
    }
    renderTableHTML += "</tr></table></div>";
    $('.renderPlaceHolder').append(renderTableHTML);
     var a = renderNames();
        a.done(function() {
	 var b = getDataFromList(SiteUrl);
	 b.done(function() {
		 var c =getHolidayDataFromList(SiteUrl);
		  c.done(function() {
		
		  });
	 });
	});
    //getDataFromList(SiteUrl);
}

function getDataFromList(SiteUrl) {
    dfcListRetriveItem = $.Deferred();

    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('Data_ResourcePlanning');
    var camlQuery = new SP.CamlQuery();

    collListItem = oList.getItems(camlQuery);

    clientContext.load(collListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryDataFromListSucceeded), Function.createDelegate(this, this.onQuerygetDataFromListFailed));
    return dfcListRetriveItem.promise();
}

function onQueryDataFromListSucceeded(sender, args) {

    var listSaSuInfo = '';
    var ListData = '';
    var availDataSpliting = '';
    var partialDataSpliting = '';
    var leaveDataSpliting = '';
    var nameDataSpliting = '';
    var monthDataSpliting = '';
    var listItemEnumerator = collListItem.getEnumerator();


    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();


        listSaSuInfo = oListItem.get_item('DeliverNote') + ":" + oListItem.get_item('CylScan') + ":" + oListItem.get_item('SCM_x0020_FM') + ":" + oListItem.get_item('QBot') + ":" + oListItem.get_item('IBot') + ":" + oListItem.get_item('DataLake') + ":" + oListItem.get_item('RPA') + ":" + oListItem.get_item('IoT') + ":" + oListItem.get_item('Enterprise_x0020_Portal') + ":" + oListItem.get_item('Name').get_lookupValue() + ":" + oListItem.get_item('Month') + ":" + oListItem.get_item('Year')+ ":" + oListItem.get_item('Agency')+ ":" + oListItem.get_item('AllProjects')+ ":" + oListItem.get_item('OnLeave')+ ":" + oListItem.get_item('Role').get_lookupValue() ;
        ListData = listSaSuInfo.split(":");
        var deliveryDataSpliting = ListData[0].split(";");
        var CylScanDataSpliting = ListData[1].split(";");
        var scmDataSpliting = ListData[2].split(";");
        var qbotDataSpliting = ListData[3].split(";");
        var ibotDataSpliting = ListData[4].split(";");
        var datalakeDataSpliting = ListData[5].split(";");
        var rpaDataSpliting = ListData[6].split(";");
        var iotDataSpliting = ListData[7].split(";");
        var enterpriseDataSpliting = ListData[8].split(";");
        var nameDataSpliting = ListData[9].split(";");
        var monthDataSpliting = ListData[10].split(";");
        var yearDataSpliting = ListData[11].split(";");
		var agencyDataSpliting = ListData[12].split(";");
		var allProjectsDataSpliting = ListData[13].split(";");
		var onLeaveDataSpliting = ListData[14].split(";");
		var roleDataSpliting=ListData[15];
        itemID = oListItem.get_item('ID');

        var findTr = $('td[placeholder="' + oListItem.get_item('Name').get_lookupValue() + '"]').closest('tr').find('.data');
        var imgdel = "<img class='imageDataClass' src='/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/blue_india.png'/>";
        var imgcyl = "<img  class='imageDataClass'  src='/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/images.png'/>";
        var imgscm = "<img class='imageDataClass'  src='/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/images%20(1).png'/>";
        var imgqbot = "<img class='imageDataClass'  src='/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/u337.jpeg'/>";
        var imgibot = "<img class='imageDataClass'  src='/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/images%20(3).png'/>";
        var imgdatalake = "<img class='imageDataClass'  src='/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/reddish_australia.png'/>";
		var imgrpa = "<img class='imageDataClass'  src='/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/images%20(2).png'/>";
        var imgiot = "<img class='imageDataClass'  src='/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/darkBlue_US.png' />";
        var imgenterprise = "<img class='imageDataClass'  src='/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/violet_fujairah.png' />";
		var imgagency="<img class='imageDataClass'  src='/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/agency.png' />";
		var imgallProjects="<img class='imageDataClass'  src='/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/allprojects1.jpg' />";
		var imgOnleave="<img class='imageDataClass'  src='/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/onleave.jpg' />";
        for (var i = 0; i <= deliveryDataSpliting.length; i++) {
			var titleDesc=roleDataSpliting+","+"Delivery Note";
            renderingTdData(findTr, deliveryDataSpliting[i],titleDesc,imgdel);

        }
        for (var i = 0; i <= CylScanDataSpliting.length; i++) {
			var titleDesc=roleDataSpliting+","+"CylScan";
            renderingTdData(findTr, CylScanDataSpliting[i],titleDesc, imgcyl);

        }
        for (var i = 0; i <= scmDataSpliting.length; i++) {
			var titleDesc=roleDataSpliting+","+"SCM";
            renderingTdData(findTr, scmDataSpliting[i],titleDesc, imgscm);

        }
        for (var i = 0; i <= qbotDataSpliting.length; i++) {
			var titleDesc=roleDataSpliting+","+"QBot";
            renderingTdData(findTr, qbotDataSpliting[i],titleDesc, imgqbot);

        }
        for (var i = 0; i <= ibotDataSpliting.length; i++) {
			var titleDesc=roleDataSpliting+","+"IBot";
            renderingTdData(findTr, ibotDataSpliting[i],titleDesc, imgibot);

        }
        for (var i = 0; i <= datalakeDataSpliting.length; i++) {
			var titleDesc=roleDataSpliting+","+"DataLake";
            renderingTdData(findTr, datalakeDataSpliting[i],titleDesc, imgdatalake);

        }
        for (var i = 0; i <= rpaDataSpliting.length; i++) {
			var titleDesc=roleDataSpliting+","+"RPA";
            renderingTdData(findTr, rpaDataSpliting[i],titleDesc, imgrpa);

        }
        for (var i = 0; i <= iotDataSpliting.length; i++) {
			var titleDesc=roleDataSpliting+","+"IoT";
            renderingTdData(findTr, iotDataSpliting[i],titleDesc, imgiot);
        }
        for (var i = 0; i <= enterpriseDataSpliting.length; i++) {
			var titleDesc=roleDataSpliting+","+"Enterprise Portal";
            renderingTdData(findTr, enterpriseDataSpliting[i],titleDesc, imgenterprise);
        }
		for (var i = 0; i <= agencyDataSpliting.length; i++) {
			var titleDesc=roleDataSpliting+","+"Agency";
            renderingTdData(findTr, agencyDataSpliting[i],titleDesc, imgagency);
        }
		for (var i = 0; i <= allProjectsDataSpliting.length; i++) {
			var titleDesc=roleDataSpliting+","+"All Projects";
            renderingTdData(findTr, allProjectsDataSpliting[i],titleDesc, imgallProjects);
        }
		for (var i = 0; i <= onLeaveDataSpliting.length; i++) {
			var titleDesc=roleDataSpliting+","+"OnLeave";
            renderingTdData(findTr, onLeaveDataSpliting[i],titleDesc, imgOnleave);
        }
    }
    $('.renderPlaceHolder').show();
   

    dfcListRetriveItem.resolve(itemID, listSaSuInfo);
}

function onQuerygetDataFromListFailed(sender, args) {

    //alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcListRetriveItem.reject();
}

function renderingTdData(currentRow, value,valTitle, image) {
    $('image').width('19px');
    $('image').height('15px');
    currentRow.each(function() {
        var currentTd = $(this);
        var classNames = $(this).attr("class").toString().split(' ');
        $.each(classNames, function(j, className) {
            if (value == className) {

                currentTd.append(image);
                currentTd.css("margin-top", "3px");
				 currentTd.attr("Title", valTitle);
            }
        });
    });
}

function renderTable(dateText, inst) {
    $(this).datepicker('widget').removeClass('hide-calendar');
    $("#bg_blocking_layer").show();
    $('.datepickerInput').datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));

    var selectMonth = inst.selectedMonth;

    var selectYear = inst.selectedYear;
    var days = Date.getDaysInMonth(selectYear, selectMonth);
    var startDay = new Date(inst.selectedYear, inst.selectedMonth, 1);
    var weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    $('.renderTable').remove();
    $('.renderData').remove();
    var renderTableHTML = "<table class='renderTable'><tr><th>Year</th>";
    renderMonthTdHTML = "";
    var weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    var yearFieldCheck = "";
    var monthFieldCheck = "";
    var yearDate = selectYear;
    var monthCheck = selectMonth;
    var monthDate = months[monthCheck];
    var monthStartDay = new Date(yearDate, monthCheck, 1);
    var monthEndDay = new Date(yearDate, (monthCheck + 1), 0);
    var weekNumStart = monthStartDay.getWeek();
    var weekNumEnd = monthEndDay.getWeek();
    var WeekFieldCheck = "";

    var renderTableHTML = '<div class="renderData yearDate"><table><tr style="margin-left: 26px;"><td style="padding-left:5px;">Year  :</td><td>' + yearDate + '</td><td style="padding-left:300px;">Month  :</td><td>' + monthDate + '</td><td style="padding-left:219px;">Week  :</td><td>' + weekNumStart + '-' + weekNumEnd + '</td></tr></table></div>';
    renderTableHTML += '<table class="renderTable"><tr>';
    renderMonthTdHTML = "";


    renderTableHTML += '<th  style="font-size:16px;width:90%">EmployeeName&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>';
    for (var startDate = 1; startDate <= days; startDate++) {
        var currentDate = new Date(startDay);
        var monthDate = currentDate.getMonth()
        // var monthFieldName=monthName[monthDate];
        var weekday = weekdays[currentDate.getDay()];
        if (startDate < 10) {
            if (weekday == "S") {
                renderTableHTML += '<th class="row ' + startDay.format("MM/dd/yyyy") + '" type="text" name="fname" placeholder="' + startDate + '" disabled style="font-size:13px;text-align:center;">' + '0' + startDate + ' </br>' + weekday + ' </th>';
                renderMonthTdHTML += '<td class="data ' + startDay.format("MM/dd/yyyy") + '" style="background-color: #6fce5c!important;"></td>';
                startDay.addDays(1);
            } else {
                renderTableHTML += '<th class="row ' + startDay.format("MM/dd/yyyy") + '" type="text" name="fname" placeholder="' + startDate + '" disabled style="font-size:13px;text-align:center;">' + '0' + startDate + ' </br>' + weekday + ' </th>';
                renderMonthTdHTML += '<td class="data ' + startDay.format("MM/dd/yyyy") + '"></td>';
                startDay.addDays(1);
            }
        } else {
            if (weekday == "S") {
                renderTableHTML += '<th class="row ' + startDay.format("MM/dd/yyyy") + '" type="text" name="fname" placeholder="' + startDate + '" disabled style="font-size:13px;text-align:center;">' + startDate + ' </br>' + weekday + ' </th>';
                renderMonthTdHTML += '<td class="data ' + startDay.format("MM/dd/yyyy") + '" style="background-color:#6fce5c !important;"></td>';
                startDay.addDays(1);
            } else {
                renderTableHTML += '<th class="row ' + startDay.format("MM/dd/yyyy") + '" type="text" name="fname" placeholder="' + startDate + '" disabled style="font-size:13px;text-align:center;">' + startDate + ' </br>' + weekday + ' </th>';
                renderMonthTdHTML += '<td class="data ' + startDay.format("MM/dd/yyyy") + '"></td>';
                startDay.addDays(1);
            }
        }
    }
    renderTableHTML += "</tr></table></div>";
    $('.renderPlaceHolder').append(renderTableHTML);
         var a = renderNames();
        a.done(function() {
	 var b = getDataFromList(SiteUrl);
	 b.done(function() {
		 var c =getHolidayDataFromList(SiteUrl);
		  c.done(function() {
			
		  });
	 });
	});


    //$(".renderPlaceHolder").show();

}

function renderNames() {
    dfcRenderloadList = $.Deferred();
    var siteUrl = _spPageContextInfo.webServerRelativeUrl;
    var oDataUrl = siteUrl + "/_vti_bin/listdata.svc/Names_ResourcePlanning";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessRender,
        error: onerrorRender
    });
    return dfcRenderloadList.promise();
}

function onsuccessRender(lstdata) {

    var renderNamesTableHTML = ""; //"<table class='renderTable'>";
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var renderitem = lstdata.d.results[i];

        renderNamesTableHTML += '<tr class="' + renderitem.Id + '"><td class="names ' + renderitem.Id + '" type="text" name="fname" placeholder="' + renderitem.Name + '" disabled style="">' + renderitem.Name + '</td>' + renderMonthTdHTML + '</tr>';


    }
    //renderNamesTableHTML+="</table>";
    $('.renderTable').append(renderNamesTableHTML);
    
    dfcRenderloadList.resolve();
}

function onerrorRender(lstdata, errCode, errMessage) {
    alert("Error5: " + errMessage);
    dfcRenderloadList.reject();
}


function getHolidayDataFromList(SiteUrl) {
    dfcHolidayRetriveItem = $.Deferred();

    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('HolidayData_ResourcePlanning');
    var camlQuery = new SP.CamlQuery();

    collListItem = oList.getItems(camlQuery);

    clientContext.load(collListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQueryHolidayFromListSucceeded), Function.createDelegate(this, this.onQuerygetHolidayFromListFailed));
    return dfcHolidayRetriveItem.promise();
}

function onQueryHolidayFromListSucceeded(sender, args) {

    var listSaSuInfo = '';
    var ListData = '';
    var availDataSpliting = '';
    var partialDataSpliting = '';
    var leaveDataSpliting = '';
    var nameDataSpliting = '';
    var monthDataSpliting = '';
    var listItemEnumerator = collListItem.getEnumerator();


    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();

        //listSaSuInfo =oListItem.get_item('Available')+":"+oListItem.get_item('PartiallyAvailable')+":"+oListItem.get_item('Leave');
        listSaSuInfo = oListItem.get_item('SingaporeHoliday') + ":" + oListItem.get_item('FujairahHoliday') + ":" + oListItem.get_item('Month') + ":" + oListItem.get_item('Year')+ ":" + oListItem.get_item('IndiaHoliday') ;

        ListData = listSaSuInfo.split(":");
        if (ListData[0] != "" && ListData[0] != null) {
            singaporeHolidayDataSpliting = ListData[0].split(";");
        }
        if (ListData[1] != "" && ListData[1] != null) {
            fujairahHolidayDataSpliting = ListData[1].split(";");
        }
		if (ListData[4] != "" && ListData[4] != null) {
            indiaHolidayDataSpliting = ListData[4].split(";");
        }
		
        monthDataSpliting = oListItem.get_item('Month').split(";");
        yearDataSpliting = oListItem.get_item('Year').split(";");

        itemHolidayID = oListItem.get_item('ID');

        var findTh = $('th[name="fname"]');
        var imgSingHoliday = "url('/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/pink.png')";
        var imgFuzHoliday = "url('/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/violet.png')";
		 var imgindiaHoliday = "url('/sites/WSS_Agency_Project/Style%20Library/ResourcePlanning/india_green.jpg')";


        for (var i = 0; i <= singaporeHolidayDataSpliting.length; i++) {
            if (singaporeHolidayDataSpliting[i] != "" && singaporeHolidayDataSpliting[i] != null) {
                var valueInfo = singaporeHolidayDataSpliting[i].split("|");
                var valDate = valueInfo[0];
                var valTitle = valueInfo[1];
                renderingThData(findTh, valDate, valTitle, imgSingHoliday);
            }

        }
        for (var j = 0; j <= fujairahHolidayDataSpliting.length; j++) {
            if (fujairahHolidayDataSpliting[j] != "" && fujairahHolidayDataSpliting[j] != null) {
                var valueInfo = fujairahHolidayDataSpliting[j].split("|");
                var valDate = valueInfo[0];
                var valTitle = valueInfo[1];
                renderingThData(findTh, valDate, valTitle, imgFuzHoliday);
            }
        }
		for (var j = 0; j <= fujairahHolidayDataSpliting.length; j++) {
            if (fujairahHolidayDataSpliting[j] != "" && fujairahHolidayDataSpliting[j] != null) {
                var valueInfo = fujairahHolidayDataSpliting[j].split("|");
                var valDate = valueInfo[0];
                var valTitle = valueInfo[1];
                renderingThData(findTh, valDate, valTitle, imgFuzHoliday);
            }
        }
		for (var j = 0; j <= indiaHolidayDataSpliting.length; j++) {
            if (indiaHolidayDataSpliting[j] != "" && indiaHolidayDataSpliting[j] != null) {
                var valueInfo = indiaHolidayDataSpliting[j].split("|");
                var valDate = valueInfo[0];
                var valTitle = valueInfo[1];
                renderingThData(findTh, valDate, valTitle, imgindiaHoliday);
            }
        }

    }
    $('.renderPlaceHolder').show();
	onChange();
    $("#bg_blocking_layer").hide();

    dfcHolidayRetriveItem.resolve(itemID, listSaSuInfo);
}

function onQuerygetHolidayFromListFailed(sender, args) {

    //alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcHolidayRetriveItem.reject();
}

function renderingThData(currentRow, valDate, valTitle, image) {
    $('image').width('19px');
    $('image').height('15px');

    currentRow.each(function() {
        var currentTd = $(this);
        var classNames = $(this).attr("class").toString().split(' ');
        $.each(classNames, function(j, className) {
            if (valDate == className) {

                currentTd.css('background-image', image);
                currentTd.css("margin-top", "3px");
                currentTd.attr("Title", valTitle);
            }
        });
    });
}