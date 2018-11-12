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
var otherSplit = "";
var indiaHolidayDataSpliting = [];
var indiaHolidayDataField = [];
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
var singaporeSpliting = [];
var indiaSpliting = [];
var fuzariahSpliting = [];
var usSpliting = [];
var nlSpliting = [];
var australiaSpliting = [];
var partialSpliting = [];
var leaveSpliting = [];
var otherSiteSpliting = [];
var newSiteValue = "";
var newDateFieldRange = [];
var leaveDataField = [];
var partialDataField = [];
var singaporeDataField = [];
var indiaDataField = [];
var fuzariahDataField = [];
var usDataField = [];
var nlDataField = [];
var australiaDataField = [];
var arrayCompareResultLeave = [];
var arrayCompareResultPartial = [];
var arrayCompareResultSingaporeAvl = [];
var arrayCompareResultIndiaAvl = [];
var arrayCompareResultFuzariahAvl = [];
var arrayCompareResultusAvl = [];
var arrayCompareResultnlAvl = [];
var arrayCompareResultaustraliaAvl = [];
var arrayCompareOtherSiteAvl = [];
var newDateField = "";
var siteMainUrl = _spPageContextInfo.webAbsoluteUrl;
var addFieldValue = "";
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
var singaporeHolidayDataField = [];
var fuzariahHolidayDataField = [];
var siteData;
var arrayCompareResultSingaporeHoliday = [];
var arrayCompareResultFuzariahHoliday = [];
var modalHoliday;
var modalDescription;
var modalSite;
var otherStateDateField = [];
$(document).ready(function() {
    SP.SOD.executeFunc('SP.js', 'SP.ClientContext', function() {
        //$("#bg_blocking_layer").show();
        $(".dataClass").hide();
        loadlist();
        renderColorCodes();

        SiteUrl = _spPageContextInfo.webAbsoluteUrl;

        $('input[name="datefilter"]').dateRangePicker({
            showWeekNumbers: true,
            singleMonth: true,
            showShortcuts: false,
            format: 'MM/DD/YYYY',
            showTopbar: false,
            autoClose: true
        });



        $(".AddDescription").click(function() {
            $('.date-picker').hide();
            $("#bg_blocking_layer").show()
            descriptionData = $('.descriptionData').val();
            modalDescription.style.display = "none";
            dataHolidaySubmit(descriptionData);
        });
        $(".SiteDescription").click(function() {
            $('.date-picker').hide();
            //$("#bg_blocking_layer").show()
            siteData = $('.descriptionSite').val();
            modalSite.style.display = "none";

            dataSubmit(siteData);
        });

        $('.date-picker').datepicker({
            changeMonth: true,
            changeYear: true,
            showWeek: true,
            showButtonPanel: true,
            dateFormat: 'MM yy',
            beforeShow: function() {
                if ((selDate = $(this).val()).length > 0) {
                    var iYear = selDate.substring(selDate.length - 4, selDate.length);
                    var iMonth = jQuery.inArray(selDate.substring(0, selDate.length - 5), $(this).datepicker('option', 'monthNames'));
                    $(this).datepicker('option', 'defaultDate', new Date(iYear, iMonth, 1));
                    $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
                }
            },
            onClose: renderTable

        });
        var param1 = new Date();
        var param2 = (param1.getMonthName()) + ' ' + param1.getFullYear();
        $('.date-picker').val(param2);
        renderInit();


    });

    $(".imageClass").click(function(e) {
        $(".dataClass").toggle();
        e.preventDefault();
    });
    $(".applyDiv").click(function(e) {
        $(".holidayClass").toggle();
        e.preventDefault();
    });

    //alertYes function
    $(".alertYes").click(function() {
        modal.style.display = "none";

        $('.date-picker').show();

        if (addSiteValue == "Other") {
            if (arrayCompareResultIndiaAvl.length > 0) {
                indiaDataField = changingValueForOtherSite(indiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultSingaporeAvl.length > 0) {
                singaporeDataField = changingValueForOtherSite(singaporeSpliting, newDateFieldRange);
            }

            if (arrayCompareResultFuzariahAvl.length > 0) {
                fuzariahDataField = changingValueForOtherSite(fuzariahSpliting, newDateFieldRange);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                nlDataField = changingValueForOtherSite(nlSpliting, newDateFieldRange);
            }
            if (arrayCompareResultusAvl.length > 0) {
                usDataField = changingValueForOtherSite(usSpliting, newDateFieldRange);
            }
            if (arrayCompareResultLeave.length > 0) {
                leaveDataField = changingValueForOtherSite(leaveSpliting, newDateFieldRange);
            }
            if (arrayCompareResultPartial.length > 0) {
                partialDataField = changingValueForOtherSite(partialSpliting, newDateFieldRange);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                otherSiteSpliting = changingValueForTwoOtherSiteNo(otherSiteSpliting, newDateFieldRange);
            }
            if (otherSiteSpliting != "null") {
                newDateFieldRange = removeSiteDuplicate(newDateFieldRange, otherSiteSpliting);
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);

        }
        if (addSiteValue == "Singapore") {
            if (arrayCompareResultIndiaAvl.length > 0) {
                indiaDataField = changingValueForSite(indiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                fuzariahDataField = changingValueForSite(fuzariahSpliting, newDateFieldRange);
            }
            if (arrayCompareResultusAvl.length > 0) {
                usDataField = changingValueForSite(usSpliting, newDateFieldRange);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                nlDataField = changingValueForSite(nlSpliting, newDateFieldRange);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                australiaDataField = changingValueForSite(australiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultLeave.length > 0) {
                leaveDataField = changingValueForSite(leaveSpliting, newDateFieldRange);
            }
            if (arrayCompareResultPartial.length > 0) {
                partialDataField = changingValueForSite(partialSpliting, newDateFieldRange);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                otherStateDateField = changingValueForOtherNewSite(newDateFieldRange, otherSiteSpliting);
            }

            if (splitVal[0] != "" && splitVal[0] != "null") {
                for (var j = 0; j < singaporeSpliting.length; j++) {


                    newDateFieldRange.push(singaporeSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);


        }
        if (addSiteValue == "India") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                singaporeDataField = changingValueForSite(singaporeSpliting, newDateFieldRange);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                fuzariahDataField = changingValueForSite(fuzariahSpliting, newDateFieldRange);
            }
            if (arrayCompareResultusAvl.length > 0) {
                usDataField = changingValueForSite(usSpliting, newDateFieldRange);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                nlDataField = changingValueForSite(nlSpliting, newDateFieldRange);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                australiaDataField = changingValueForSite(australiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultLeave.length > 0) {
                leaveDataField = changingValueForSite(leaveSpliting, newDateFieldRange);
            }
            if (arrayCompareResultPartial.length > 0) {
                partialDataField = changingValueForSite(partialSpliting, newDateFieldRange);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                otherStateDateField = changingValueForOtherNewSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[1] != "" && splitVal[1] != "null") {
                for (var j = 0; j < indiaSpliting.length; j++) {


                    newDateFieldRange.push(indiaSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);

        }

        if (addSiteValue == "Fujairah") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                singaporeDataField = changingValueForSite(singaporeSpliting, newDateFieldRange);
            }
            if (arrayCompareResultIndiaAvl.length > 0) {
                indiaDataField = changingValueForSite(indiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultusAvl.length > 0) {
                usDataField = changingValueForSite(usSpliting, newDateFieldRange);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                nlDataField = changingValueForSite(nlSpliting, newDateFieldRange);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                australiaDataField = changingValueForSite(australiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultLeave.length > 0) {
                leaveDataField = changingValueForSite(leaveSpliting, newDateFieldRange);
            }
            if (arrayCompareResultPartial.length > 0) {
                partialDataField = changingValueForSite(partialSpliting, newDateFieldRange);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                otherStateDateField = changingValueForOtherNewSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[2] != "" && splitVal[2] != "null") {
                for (var j = 0; j < fuzariahSpliting.length; j++) {


                    newDateFieldRange.push(fuzariahSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);

        }

        if (addSiteValue == "Norway") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                singaporeDataField = changingValueForSite(singaporeSpliting, newDateFieldRange);
            }
            if (arrayCompareResultIndiaAvl.length > 0) {
                indiaDataField = changingValueForSite(indiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                fuzariahDataField = changingValueForSite(fuzariahSpliting, newDateFieldRange);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                nlDataField = changingValueForSite(nlSpliting, newDateFieldRange);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                australiaDataField = changingValueForSite(australiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultLeave.length > 0) {
                fuzariahDataField = changingValueForSite(leaveSpliting, newDateFieldRange);
            }
            if (arrayCompareResultPartial.length > 0) {
                partialDataField = changingValueForSite(partialSpliting, newDateFieldRange);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                otherStateDateField = changingValueForOtherNewSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[3] != "" && splitVal[3] != "null") {
                for (var j = 0; j < usSpliting.length; j++) {


                    newDateFieldRange.push(usSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);

        }
        if (addSiteValue == "NL") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                singaporeDataField = changingValueForSite(singaporeSpliting, newDateFieldRange);
            }
            if (arrayCompareResultIndiaAvl.length > 0) {
                indiaDataField = changingValueForSite(indiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                fuzariahDataField = changingValueForSite(fuzariahSpliting, newDateFieldRange);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                australiaDataField = changingValueForSite(australiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultusAvl.length > 0) {
                usDataField = changingValueForSite(usSpliting, newDateFieldRange);
            }
            if (arrayCompareResultLeave.length > 0) {
                leaveDataField = changingValueForSite(leaveSpliting, newDateFieldRange);
            }
            if (arrayCompareResultPartial.length > 0) {
                partialDataField = changingValueForSite(partialSpliting, newDateFieldRange);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                otherStateDateField = changingValueForOtherNewSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[4] != "" && splitVal[4] != "null") {
                for (var j = 0; j < nlSpliting.length; j++) {


                    newDateFieldRange.push(nlSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);

        }
        if (addSiteValue == "Australia") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                singaporeDataField = changingValueForSite(singaporeSpliting, newDateFieldRange);
            }
            if (arrayCompareResultIndiaAvl.length > 0) {
                indiaDataField = changingValueForSite(indiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                fuzariahDataField = changingValueForSite(fuzariahSpliting, newDateFieldRange);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                nlDataField = changingValueForSite(nlSpliting, newDateFieldRange);
            }
            if (arrayCompareResultusAvl.length > 0) {
                usDataField = changingValueForSite(usSpliting, newDateFieldRange);
            }
            if (arrayCompareResultLeave.length > 0) {
                leaveDataField = changingValueForSite(leaveSpliting, newDateFieldRange);
            }
            if (arrayCompareResultPartial.length > 0) {
                partialDataField = changingValueForSite(partialSpliting, newDateFieldRange);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                otherStateDateField = changingValueForOtherNewSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[5] != "" && splitVal[5] != "null") {
                for (var j = 0; j < australiaSpliting.length; j++) {


                    newDateFieldRange.push(australiaSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);

        }
        if (addSiteValue == "PartiallyAvailable") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                singaporeDataField = changingValueForSite(singaporeSpliting, newDateFieldRange);
            }
            if (arrayCompareResultIndiaAvl.length > 0) {
                indiaDataField = changingValueForSite(indiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                fuzariahDataField = changingValueForSite(fuzariahSpliting, newDateFieldRange);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                nlDataField = changingValueForSite(nlSpliting, newDateFieldRange);
            }
            if (arrayCompareResultusAvl.length > 0) {
                usDataField = changingValueForSite(usSpliting, newDateFieldRange);
            }
            if (arrayCompareResultLeave.length > 0) {
                leaveDataField = changingValueForSite(leaveSpliting, newDateFieldRange);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                australiaDataField = changingValueForSite(australiaSpliting, newDateFieldRange);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                otherStateDateField = changingValueForOtherNewSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[6] != "" && splitVal[6] != "null") {
                for (var j = 0; j < partialSpliting.length; j++) {


                    newDateFieldRange.push(partialSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);

        }
        if (addSiteValue == "OnLeave") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                singaporeDataField = changingValueForSite(singaporeSpliting, newDateFieldRange);
            }
            if (arrayCompareResultIndiaAvl.length > 0) {
                indiaDataField = changingValueForSite(indiaSpliting, newDateFieldRange);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                fuzariahDataField = changingValueForSite(fuzariahSpliting, newDateFieldRange);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                nlDataField = changingValueForSite(nlSpliting, newDateFieldRange);
            }
            if (arrayCompareResultusAvl.length > 0) {
                usDataField = changingValueForSite(usSpliting, newDateFieldRange);
            }
            if (arrayCompareResultLeave.length > 0) {
                leaveDataField = changingValueForSite(leaveSpliting, newDateFieldRange);
            }
            if (arrayCompareResultPartial.length > 0) {
                partialDataField = changingValueForSite(partialSpliting, newDateFieldRange);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                otherStateDateField = changingValueForOtherNewSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[7] != "" && splitVal[7] != "null") {
                for (var j = 0; j < leaveSpliting.length; j++) {


                    newDateFieldRange.push(leaveSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);

        }
    });

    //end alertYes function

    //alertNo function
    $(".alertNo").click(function() {
        modal.style.display = "none";

        $('.date-picker').show();
        if (addSiteValue == "Other") {
            if (arrayCompareResultIndiaAvl.length > 0) {
                newDateFieldRange = changingValueForOtherSiteNo(newDateFieldRange, indiaSpliting);
            }
            if (arrayCompareResultSingaporeAvl.length > 0) {
                newDateFieldRange = changingValueForOtherSiteNo(newDateFieldRange, singaporeSpliting);
            }

            if (arrayCompareResultFuzariahAvl.length > 0) {
                newDateFieldRange = changingValueForOtherSiteNo(newDateFieldRange, fuzariahSpliting);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                newDateFieldRange = changingValueForOtherSiteNo(newDateFieldRange, nlSpliting);
            }
            if (arrayCompareResultusAvl.length > 0) {
                newDateFieldRange = changingValueForOtherSiteNo(newDateFieldRange, usSpliting);
            }
            if (arrayCompareResultLeave.length > 0) {
                newDateFieldRange = changingValueForOtherSiteNo(newDateFieldRange, leaveSpliting);
            }
            if (arrayCompareResultPartial.length > 0) {
                newDateFieldRange = changingValueForOtherSiteNo(newDateFieldRange, partialSpliting);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                newDateFieldRange = changingValueForTwoOtherSiteNo(newDateFieldRange, otherSiteSpliting);
            }

            newDateFieldRange = removeSiteDuplicate(otherSiteSpliting, newDateFieldRange);
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);

        }

        if (addSiteValue == "Singapore") {
            if (arrayCompareResultIndiaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, indiaSpliting);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, fuzariahSpliting);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, nlSpliting);
            }
            if (arrayCompareResultusAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, usSpliting);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, australiaSpliting);
            }
            if (arrayCompareResultPartial.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, partialSpliting);
            }
            if (arrayCompareResultLeave.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, leaveSpliting);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                newDateFieldRange == changingValueForOtherSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[0] != "" && splitVal[0] != "null") {
                for (var j = 0; j < singaporeSpliting.length; j++) {


                    newDateFieldRange.push(singaporeSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
        }
        if (addSiteValue == "India") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, singaporeSpliting);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, fuzariahSpliting);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, nlSpliting);
            }
            if (arrayCompareResultusAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, usSpliting);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, australiaSpliting);
            }
            if (arrayCompareResultPartial.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, partialSpliting);
            }
            if (arrayCompareResultLeave.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, leaveSpliting);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                newDateFieldRange == changingValueForOtherSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[1] != "" && splitVal[1] != "null") {
                for (var j = 0; j < indiaSpliting.length; j++) {


                    newDateFieldRange.push(indiaSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
        }
        if (addSiteValue == "Fujairah") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, singaporeSpliting);
            }
            if (arrayCompareResultIndiaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, indiaSpliting);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, nlSpliting);
            }
            if (arrayCompareResultusAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, usSpliting);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, australiaSpliting);
            }
            if (arrayCompareResultPartial.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, partialSpliting);
            }
            if (arrayCompareResultLeave.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, leaveSpliting);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                newDateFieldRange == changingValueForOtherSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[2] != "" && splitVal[2] != "null") {
                for (var j = 0; j < fuzariahSpliting.length; j++) {


                    newDateFieldRange.push(fuzariahSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
        }
        if (addSiteValue == "Norway") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, singaporeSpliting);
            }
            if (arrayCompareResultIndiaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, indiaSpliting);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, fuzariahSpliting);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, nlSpliting);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, australiaSpliting);
            }
            if (arrayCompareResultPartial.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, partialSpliting);
            }
            if (arrayCompareResultLeave.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, leaveSpliting);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                newDateFieldRange == changingValueForOtherSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[3] != "" && splitVal[3] != "null") {
                for (var j = 0; j < usSpliting.length; j++) {


                    newDateFieldRange.push(usSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
        }
        if (addSiteValue == "NL") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, singaporeSpliting);
            }
            if (arrayCompareResultIndiaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, indiaSpliting);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, fuzariahSpliting);
            }
            if (arrayCompareResultusAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, usSpliting);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, australiaSpliting);
            }
            if (arrayCompareResultPartial.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, partialSpliting);
            }
            if (arrayCompareResultLeave.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, leaveSpliting);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                newDateFieldRange == changingValueForOtherSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[4] != "" && splitVal[4] != "null") {
                for (var j = 0; j < nlSpliting.length; j++) {


                    newDateFieldRange.push(nlSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
        }
        if (addSiteValue == "Australia") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, singaporeSpliting);
            }
            if (arrayCompareResultIndiaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, indiaSpliting);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, fuzariahSpliting);
            }
            if (arrayCompareResultusAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, usSpliting);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, nlSpliting);
            }
            if (arrayCompareResultPartial.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, partialSpliting);
            }
            if (arrayCompareResultLeave.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, leaveSpliting);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                newDateFieldRange == changingValueForOtherSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[5] != "" && splitVal[5] != "null") {
                for (var j = 0; j < australiaSpliting.length; j++) {


                    newDateFieldRange.push(australiaSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
        }
        if (addSiteValue == "PartiallyAvailable") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, singaporeSpliting);
            }
            if (arrayCompareResultIndiaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, indiaSpliting);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, fuzariahSpliting);
            }
            if (arrayCompareResultusAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, usSpliting);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, nlSpliting);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, australiaSpliting);
            }
            if (arrayCompareResultLeave.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, leaveSpliting);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                newDateFieldRange == changingValueForOtherSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[6] != "" && splitVal[6] != "null") {
                for (var j = 0; j < partialSpliting.length; j++) {


                    newDateFieldRange.push(partialSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
        }
        if (addSiteValue == "OnLeave") {
            if (arrayCompareResultSingaporeAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, singaporeSpliting);
            }
            if (arrayCompareResultIndiaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, indiaSpliting);
            }
            if (arrayCompareResultFuzariahAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, fuzariahSpliting);
            }
            if (arrayCompareResultusAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, usSpliting);
            }
            if (arrayCompareResultnlAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, nlSpliting);
            }
            if (arrayCompareResultaustraliaAvl.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, australiaSpliting);
            }
            if (arrayCompareResultPartial.length > 0) {
                newDateFieldRange == changingValueForSite(newDateFieldRange, partialSpliting);
            }
            if (arrayCompareOtherSiteAvl.length > 0) {
                newDateFieldRange == changingValueForOtherSite(newDateFieldRange, otherSiteSpliting);
            }
            if (splitVal[7] != "" && splitVal[7] != "null") {
                for (var j = 0; j < leaveSpliting.length; j++) {


                    newDateFieldRange.push(leaveSpliting[j]);
                }
            }
            newDateFieldRange = removeEmptyValues(newDateFieldRange);
            newDateFieldRange = removeDuplicate(newDateFieldRange);
            newDateFieldRange = newDateFieldRange.sort();
            stringDate = newDateFieldRange.join(";");

            addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
        }

    });

    //end alertNo function


    $(".alertCancel").click(function() {
        modal.style.display = "none";

        $('.date-picker').show();
        $('.dateClass').val('');
        $('#avail').val('choose');
        loadlist();
        $('.selectedAvail').removeClass('selectedAvail');
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
                var resultHolidayAdd = addHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField);
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
                var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
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
                var resultHolidayAdd = addHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField);
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
                var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
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
                var resultHolidayAdd = addHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField);
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
                var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
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
                var resultHolidayAdd = addHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField);
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
                var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField, indiaHolidayDataField);
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
                var resultHolidayAdd = addHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField);
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
                var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
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
                var resultHolidayAdd = addHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField);
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
                var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
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
		$('.selectedAvail').removeClass('selectedAvail');
		$('input[name="datefilter"]').val('');

    });
    $(".alertDescription").click(function() {
        $('.selectedAvail').removeClass('selectedAvail');
        modalDescription.style.display = "none";
        $('.date-picker').show();
    });
    $(".alertSiteDescription").click(function() {
		  $('.date-picker').show();
        $('.selectedAvail').removeClass('selectedAvail');
        modalSite.style.display = "none";
      
    });


});

function dataHolidaySubmit(descriptionData) {
    siteMainUrl = _spPageContextInfo.webAbsoluteUrl;
	$("#bg_blocking_layer").show();
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
                            var resultHolidayAdd = addHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField);
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
                            var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
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
                            var resultHolidayAdd = addHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField);
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
                            var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
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
                            var resultHolidayAdd = addHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField);
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
                            var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
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
                        var resultHolidayAdd = addHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField);
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
                        var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
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
                    var resultHolidayAdd = addHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField);
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
                    var resultHolidayAdd = updateHolidayListItem(siteMainUrl, "AvailabilitySheet_Holiday", addHolidayValue, stringDate, monthField, yearField, itemHolidayID, singaporeHolidayDataField, fuzariahHolidayDataField,indiaHolidayDataField);
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


function dataSubmit(siteData) {
    siteMainUrl = _spPageContextInfo.webAbsoluteUrl;

    addFieldValue = $("#names").val();
    addFieldValueText = $("#names").find("option:selected").text();
    lkaddFieldValue = new SP.FieldLookupValue();
    lkaddFieldValue.set_lookupId(addFieldValue);
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
    if (addSiteValue != "Other") {
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
    } else {
        while (startDateRange <= endDateRange) {
            month_value = startDateRange.getMonth();
            monthField = months[month_value];
            yearField = startDateRange.getFullYear();

            itemSiteID = 0;
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
            tempDate = tempDate + "|" + siteData;
            stringDate += tempDate + ';';


            startDateRange.setDate(startDateRange.getDate() + 1);
        }

    }
    if (addFieldValueText != "Choose Name" && $('.dateClass').val() != "" &&
        $('.selectedAvail').length != 0) {
        var resultSvSb = getSavedSubmitData(siteMainUrl, addFieldValueText, monthField, yearField);
        resultSvSb.done(function(itemID, listSaSuInfo) {

            newDateField = "";
            if (listSaSuInfo != "") {
                splitVal = listSaSuInfo.split(":");
                singaporeSpliting = splitVal[0].split(";");
                indiaSpliting = splitVal[1].split(";");
                fuzariahSpliting = splitVal[2].split(";");
                usSpliting = splitVal[3].split(";");
                nlSpliting = splitVal[4].split(";");
                australiaSpliting = splitVal[5].split(";");
                partialSpliting = splitVal[6].split(";");
                leaveSpliting = splitVal[7].split(";");
                otherSiteSpliting = splitVal[10].split(";");

                newSiteValue = "";
                newDateFieldRange = stringDate.split(";")
                leaveDataField = leaveSpliting.join(";");
                partialDataField = partialSpliting.join(";");

                singaporeDataField = singaporeSpliting.join(";");
                indiaDataField = indiaSpliting.join(";");
                fuzariahDataField = fuzariahSpliting.join(";");
                usDataField = usSpliting.join(";");
                nlDataField = nlSpliting.join(";");
                australiaDataField = australiaSpliting.join(";");
                otherStateDateField = otherSiteSpliting.join(";");


                if (addSiteValue != "Other") {
                    arrayCompareResultLeave = comparingTwoArray(newDateFieldRange, leaveSpliting);

                    arrayCompareResultPartial = comparingTwoArray(newDateFieldRange, partialSpliting);

                    arrayCompareResultSingaporeAvl = comparingTwoArray(newDateFieldRange, singaporeSpliting);
                    arrayCompareResultIndiaAvl = comparingTwoArray(newDateFieldRange, indiaSpliting);
                    arrayCompareResultFuzariahAvl = comparingTwoArray(newDateFieldRange, fuzariahSpliting);
                    arrayCompareResultusAvl = comparingTwoArray(newDateFieldRange, usSpliting);
                    arrayCompareResultnlAvl = comparingTwoArray(newDateFieldRange, nlSpliting);
                    arrayCompareResultaustraliaAvl = comparingTwoArray(newDateFieldRange, australiaSpliting);

                    arrayCompareOtherSiteAvl = comparingTwoArraySite(otherSiteSpliting, newDateFieldRange);
                } else {
                    arrayCompareResultIndiaAvl = comparingTwoArraySite(newDateFieldRange, indiaSpliting);
                    arrayCompareResultLeave = comparingTwoArraySite(newDateFieldRange, leaveSpliting);
                    arrayCompareResultPartial = comparingTwoArraySite(newDateFieldRange, partialSpliting);
                    arrayCompareResultSingaporeAvl = comparingTwoArraySite(newDateFieldRange, singaporeSpliting);
                    arrayCompareResultFuzariahAvl = comparingTwoArraySite(newDateFieldRange, fuzariahSpliting);
                    arrayCompareResultusAvl = comparingTwoArraySite(newDateFieldRange, usSpliting);
                    arrayCompareResultnlAvl = comparingTwoArraySite(
                        newDateFieldRange, nlSpliting);
                    arrayCompareOtherSiteAvl = comparingTwoOtherSite(
                        newDateFieldRange, otherSiteSpliting);


                }
                var txt;
                var newDateRangeLeave;
                var newDateRangePartial;


                if (addSiteValue == "Singapore") {
                    if (arrayCompareResultIndiaAvl.length > 0 || arrayCompareResultFuzariahAvl.length > 0 || arrayCompareResultusAvl.length > 0 || arrayCompareResultnlAvl.length > 0 || arrayCompareResultaustraliaAvl.length > 0 || arrayCompareResultLeave.length > 0 || arrayCompareResultPartial.length > 0 ||
                        arrayCompareOtherSiteAvl.length > 0) {
                        modal = document.getElementById('myModal');
                        $("#bg_blocking_layer").hide();
                        modal.style.display = "block";
                        $('.date-picker').hide();
                    } else {
                        if (splitVal[0] != "" && splitVal[0] != "null") {
                            for (var j = 0; j < singaporeSpliting.length; j++) {


                                newDateFieldRange.push(singaporeSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
                    }
                }
                if (addSiteValue == "India") {
                    if (arrayCompareResultSingaporeAvl.length > 0 || arrayCompareResultFuzariahAvl.length > 0 || arrayCompareResultusAvl.length > 0 || arrayCompareResultnlAvl.length > 0 || arrayCompareResultaustraliaAvl.length > 0 || arrayCompareResultLeave.length > 0 || arrayCompareResultPartial.length > 0 ||
                        arrayCompareOtherSiteAvl.length > 0) {
                        modal = document.getElementById('myModal');
                        $("#bg_blocking_layer").hide();
                        modal.style.display = "block";
                        $('.date-picker').hide();

                    } else {
                        if (splitVal[1] != "" && splitVal[1] != "null") {
                            for (var j = 0; j < indiaSpliting.length; j++) {


                                newDateFieldRange.push(indiaSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
                    }
                }

                if (addSiteValue == "Fujairah") {
                    if (arrayCompareResultSingaporeAvl.length > 0 || arrayCompareResultIndiaAvl.length > 0 || arrayCompareResultusAvl.length > 0 || arrayCompareResultnlAvl.length > 0 || arrayCompareResultaustraliaAvl.length > 0 || arrayCompareResultLeave.length > 0 || arrayCompareResultPartial.length > 0 ||
                        arrayCompareOtherSiteAvl.length > 0) {

                        modal = document.getElementById('myModal');
                        $("#bg_blocking_layer").hide();
                        modal.style.display = "block";
                        $('.date-picker').hide();



                    } else {
                        if (splitVal[2] != "" && splitVal[2] != "null") {
                            for (var j = 0; j < fuzariahSpliting.length; j++) {


                                newDateFieldRange.push(fuzariahSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
                    }
                }
                if (addSiteValue == "Norway") {
                    if (arrayCompareResultSingaporeAvl.length > 0 || arrayCompareResultIndiaAvl.length > 0 || arrayCompareResultFuzariahAvl.length > 0 || arrayCompareResultnlAvl.length > 0 || arrayCompareResultaustraliaAvl.length > 0 || arrayCompareResultLeave.length > 0 || arrayCompareResultPartial.length > 0 ||
                        arrayCompareOtherSiteAvl.length > 0) {

                        modal = document.getElementById('myModal');
                        $("#bg_blocking_layer").hide();
                        modal.style.display = "block";
                        $('.date-picker').hide();



                    } else {
                        if (splitVal[3] != "" && splitVal[3] != "null") {
                            for (var j = 0; j < usSpliting.length; j++) {


                                newDateFieldRange.push(usSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");
                        addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
                    }
                }

                if (addSiteValue == "NL") {
                    if (arrayCompareResultSingaporeAvl.length > 0 || arrayCompareResultIndiaAvl.length > 0 || arrayCompareResultFuzariahAvl.length > 0 || arrayCompareResultusAvl.length > 0 || arrayCompareResultaustraliaAvl.length > 0 || arrayCompareResultLeave.length > 0 || arrayCompareResultPartial.length > 0 ||
                        arrayCompareOtherSiteAvl.length > 0) {

                        modal = document.getElementById('myModal');
                        $("#bg_blocking_layer").hide();
                        modal.style.display = "block";
                        $('.date-picker').hide();



                    } else {
                        if (splitVal[4] != "" && splitVal[4] != "null") {
                            for (var j = 0; j < nlSpliting.length; j++) {


                                newDateFieldRange.push(nlSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");
                        addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);


                    }

                }
                if (addSiteValue == "PartiallyAvailable") {
                    if (arrayCompareResultSingaporeAvl.length > 0 || arrayCompareResultIndiaAvl.length > 0 || arrayCompareResultFuzariahAvl.length > 0 || arrayCompareResultusAvl.length > 0 || arrayCompareResultaustraliaAvl.length > 0 || arrayCompareResultnlAvl.length > 0 || arrayCompareResultLeave.length > 0 ||
                        arrayCompareOtherSiteAvl.length > 0) {
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";
                        $("#bg_blocking_layer").hide();
                        $('.date-picker').hide();


                    } else {
                        if (splitVal[6] != "" && splitVal[6] != "null") {
                            for (var j = 0; j < partialSpliting.length; j++) {

                                newDateFieldRange.push(partialSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);

                    }

                }
                if (addSiteValue == "OnLeave") {

                    if (arrayCompareResultSingaporeAvl.length > 0 || arrayCompareResultIndiaAvl.length > 0 || arrayCompareResultFuzariahAvl.length > 0 || arrayCompareResultusAvl.length > 0 || arrayCompareResultaustraliaAvl.length > 0 || arrayCompareResultnlAvl.length > 0 || arrayCompareResultPartial.length > 0 ||
                        arrayCompareOtherSiteAvl.length > 0) {
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";
                        $("#bg_blocking_layer").hide();
                        $('.date-picker').hide();

                    } else {
                        if (splitVal[7] != "" && splitVal[7] != "null") {
                            for (var j = 0; j < leaveSpliting.length; j++) {

                                newDateFieldRange.push(leaveSpliting[j]);
                            }
                        }
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = removeDuplicate(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");

                        addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);

                    }
                }

                if (addSiteValue == "Other") {
                    if (arrayCompareResultIndiaAvl.length > 0 || arrayCompareResultFuzariahAvl.length > 0 || arrayCompareResultusAvl.length > 0 || arrayCompareResultnlAvl.length > 0 || arrayCompareResultSingaporeAvl.length > 0 || arrayCompareResultLeave.length > 0 || arrayCompareResultPartial.length > 0 ||
                        arrayCompareOtherSiteAvl.length > 0) {
                        modal = document.getElementById('myModal');
                        modal.style.display = "block";
                        $("#bg_blocking_layer").hide();
                        $('.date-picker').hide();
                    } else {

                        newDateFieldRange = removeSiteDuplicate(newDateFieldRange, otherSiteSpliting);
                        newDateFieldRange = removeEmptyValues(newDateFieldRange);
                        newDateFieldRange = newDateFieldRange.sort();
                        stringDate = newDateFieldRange.join(";");
                        addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);

                    }


                }
                if (addSiteValue == "Cancel") {

                    if (arrayCompareResultSingaporeAvl.length > 0) {
                        var afterRemovingNFSin = removeValues(singaporeSpliting, newDateFieldRange); //singapore
                        var afterEmptyNFSin = removeEmptyValues(afterRemovingNFSin);
                        afterEmptyNFSin = afterEmptyNFSin.sort();
                        singaporeDataField = afterEmptyNFSin.join(";");
                    }
                    if (arrayCompareResultIndiaAvl.length > 0) {
                        var afterRemovingNFIn = removeValues(indiaSpliting, newDateFieldRange); //india
                        var afterEmptyNFIn = removeEmptyValues(afterRemovingNFIn);
                        afterEmptyNFIn = afterEmptyNFIn.sort();
                        indiaDataField = afterEmptyNFIn.join(";");
                    }
                    if (arrayCompareResultFuzariahAvl.length > 0) {
                        var afterRemovingNFFz = removeValues(fuzariahSpliting, newDateFieldRange); //fuzariah
                        var afterEmptyNFFz = removeEmptyValues(afterRemovingNFFz);
                        afterEmptyNFFz = afterEmptyNFFz.sort();
                        fuzariahDataField = afterEmptyNFFz.join(";");
                    }
                    if (arrayCompareResultnlAvl.length > 0) {
                        var afterRemovingNFNL = removeValues(nlSpliting, newDateFieldRange); //NL
                        var afterEmptyNFNL = removeEmptyValues(afterRemovingNFNL);
                        afterEmptyNFNL = afterEmptyNFNL.sort();
                        nlDataField = afterEmptyNFNL.join(";");
                    }

                    if (arrayCompareResultusAvl.length > 0) {
                        var afterRemovingNFUS = removeValues(usSpliting, newDateFieldRange); //Us
                        var afterEmptyNFUS = removeEmptyValues(afterRemovingNFUS);
                        afterEmptyNFUS = afterEmptyNFUS.sort();
                        usDataField = afterEmptyNFUS.join(";");
                    }
                    if (arrayCompareResultaustraliaAvl.length > 0) {
                        var afterRemovingNFAus = removeValues(australiaSpliting, newDateFieldRange); //Australia
                        var afterEmptyNFAus = removeEmptyValues(afterRemovingNFAus);
                        afterEmptyNFAus = afterEmptyNFAus.sort();
                        australiaDataField = afterEmptyNFAus.join(";");
                    }

                    if (arrayCompareResultLeave.length > 0) {
                        var afterRemovingNFL = removeValues(leaveSpliting, newDateFieldRange);
                        var afterEmptyNFL = removeEmptyValues(afterRemovingNFL);
                        afterEmptyNFL = afterEmptyNFL.sort();
                        leaveDataField = afterEmptyNFL.join(";");

                    }
                    if (arrayCompareResultPartial.length > 0) {
                        var afterRemovingNFP = removeValues(partialSpliting, newDateFieldRange);

                        var afterEmptyNFP = removeEmptyValues(afterRemovingNFP);
                        afterEmptyNFP = afterEmptyNFP.sort();
                        partialDataField = afterEmptyNFP.join(";");
                    }
                    if (arrayCompareOtherSiteAvl.length > 0) {
                        otherStateDateField = changingValueForHolidaySite(otherSiteSpliting, newDateFieldRange);
                    }

                    addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
                }
            } else {
                addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
            }

        });
        resultSvSb.fail(function(arg) {
            alert(arg);
        });
    } else {
        $("#bg_blocking_layer").hide();

        alert("Please select name and date");
		 $('.date-picker').show();
        $('.dateClass').val('');
        loadlist();
        $('.selectedAvail').removeClass('selectedAvail');

    }

}

function removeHolidayDuplicate(arr1, arr2) {

    for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] != "" && arr2[j] != "" && arr2[j] != undefined) {
                if (arr1[i].split('|')[0] == arr2[j].split('|')[0]) {

                    arr2[j] = arr1[i];
                } else {

                    arr2.push(arr1[i]);
                }
            }
        }

    }
    return removeDuplicate(arr2);

    //return arr2
}

function removeSiteDuplicate(arr1, arr2) {
    var newArray = arr1.concat(arr2);

    return removeDuplicate(newArray);

    //return arr2
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

function comparingTwoArraySite(arr1, arr2) {
    var temparr = [];
    for (i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i].split('|')[0] == arr2[j] && arr1[i].split('|')[0] != "" && arr2[j] != "") {

                temparr.push(arr1[i]);

            }
        }

    }
    return temparr;
}


function comparingTwoOtherSite(arr1, arr2) {
    var temparr = [];
    for (i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i].split('|')[0] == arr2[j].split('|')[0] && arr1[i].split('|')[0] != "" && arr2[j] != "") {

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

    var my_array = arr1.filter(function(x) {
        return (x !== (undefined || null || ""));
    });
    return my_array;
}

function addListItem(siteUrl, lstName, lkaddFieldValue, lkaddSiteValue, tempDate, month_value, yearField) {
    dfcAddItem = $.Deferred();
    var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(lstName);

    var itemCreateInfo = new SP.ListItemCreationInformation();

    oListItem = oList.addItem(itemCreateInfo);
    oListItem.set_item("Name", lkaddFieldValue);



    if (lkaddSiteValue == "Australia") {
        if (tempDate != "") {
            oListItem.set_item("Australia", tempDate);
        } else {
            oListItem.set_item("Australia", "");
        }
    }

    if (lkaddSiteValue == "Singapore") {
        if (tempDate != "") {
            oListItem.set_item("Singapore", tempDate);
        } else {
            oListItem.set_item("Singapore", "");
        }
    }
    if (lkaddSiteValue == "India") {
        if (tempDate != "") {
            oListItem.set_item("India", tempDate);
        } else {
            oListItem.set_item("India", "");
        }
    }
    if (lkaddSiteValue == "Fujairah") {
        if (tempDate != "") {
            oListItem.set_item("Fujairah", tempDate);
        } else {
            oListItem.set_item("Fujairah", "");
        }
    }
    if (lkaddSiteValue == "Norway") {
        if (tempDate != "") {
            oListItem.set_item("US", tempDate);
        } else {
            oListItem.set_item("US", "");
        }
    }
    if (lkaddSiteValue == "NL") {
        if (tempDate != "") {
            oListItem.set_item("NL", tempDate);
        } else {
            oListItem.set_item("NL", "");
        }
    }
    if (lkaddSiteValue == "PartiallyAvailable") {
        if (tempDate != "") {
            oListItem.set_item("PartiallyAvailable", tempDate);
        } else {
            oListItem.set_item("Available", "");
        }
    }
    if (lkaddSiteValue == "OnLeave") {
        if (tempDate != "") {
            oListItem.set_item("Leave", tempDate);
        } else {
            oListItem.set_item("Available", "");
        }
    }
    if (lkaddSiteValue == "SingaporeHoliday") {
        if (tempDate != "") {
            oListItem.set_item("SingaporeHoliday", tempDate);
        } else {
            oListItem.set_item("SingaporeHoliday", "");
        }
    }
    if (lkaddSiteValue == "FujairahHoliday") {
        if (tempDate != "") {
            oListItem.set_item("FuzariahHoliday", tempDate);
        } else {
            oListItem.set_item("FuzariahHoliday", "");
        }
    }
    if (lkaddSiteValue == "Other") {
        if (tempDate != "") {
            oListItem.set_item("Other", tempDate);
        } else {
            oListItem.set_item("Other", "");
        }
    }
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


function updateListItem(siteMainUrl, lstName, addSiteValue, stringDate, monthField, yearField, itemID, newDateField, availSpliting, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveSpliting, partialSpliting, otherStateDateField) {
    dfcUpdateItem = $.Deferred();
    var clientContext = new SP.ClientContext(siteMainUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(lstName);

    oListItem = oList.getItemById(itemID);
    if (addSiteValue == "Other") {
        if (stringDate != "" && stringDate != "null") {
            oListItem.set_item("Other", stringDate);
        } else {
            oListItem.set_item("Other", "");
        }
        if (indiaDataField != "" && indiaDataField != "null") {
            oListItem.set_item("India", indiaDataField);
        } else {
            oListItem.set_item("India", "");
        }
        if (availSpliting != "" && availSpliting != "null") {
            oListItem.set_item("Singapore", availSpliting);
        } else {
            oListItem.set_item("Singapore", "");
        }

        if (fuzariahDataField != "" && fuzariahDataField != "null") {
            oListItem.set_item("Fujairah", fuzariahDataField);
        } else {
            oListItem.set_item("Fujairah", "");
        }
        if (usDataField != "" && usDataField != "null") {
            oListItem.set_item("US", usDataField);
        } else {
            oListItem.set_item("US", "");
        }
        if (nlDataField != "" && nlDataField != "null") {
            oListItem.set_item("NL", nlDataField);
        } else {
            oListItem.set_item("NL", "");
        }
        if (partialSpliting != "" && partialSpliting != "null") {
            oListItem.set_item("PartiallyAvailable", partialSpliting);
        } else {
            oListItem.set_item("PartiallyAvailable", "");
        }
        if (leaveSpliting != "" && leaveSpliting != "null") {
            oListItem.set_item("Leave", leaveSpliting);
        } else {
            oListItem.set_item("Leave", "");
        }

    }
    if (addSiteValue == "Singapore") {
        if (stringDate != "" && stringDate != "null") {
            oListItem.set_item("Singapore", stringDate);
        } else {
            oListItem.set_item("Singapore", "");
        }

        if (fuzariahDataField != "" && fuzariahDataField != "null") {
            oListItem.set_item("Fujairah", fuzariahDataField);
        } else {
            oListItem.set_item("Fujairah", "");
        }
        if (indiaDataField != "" && indiaDataField != "null") {
            oListItem.set_item("India", indiaDataField);
        } else {
            oListItem.set_item("India", "");
        }
        if (usDataField != "" && usDataField != "null") {
            oListItem.set_item("US", usDataField);
        } else {
            oListItem.set_item("US", "");
        }
        if (nlDataField != "" && nlDataField != "null") {
            oListItem.set_item("NL", nlDataField);
        } else {
            oListItem.set_item("NL", "");
        }
        if (australiaDataField != "" && australiaDataField != "null") {
            oListItem.set_item("Australia", australiaDataField);
        } else {
            oListItem.set_item("Australia", "");
        }

        if (partialSpliting != "" && partialSpliting != "null") {
            oListItem.set_item("PartiallyAvailable", partialSpliting);
        } else {
            oListItem.set_item("PartiallyAvailable", "");
        }
        if (leaveSpliting != "" && leaveSpliting != "null") {
            oListItem.set_item("Leave", leaveSpliting);
        } else {
            oListItem.set_item("Leave", "");
        }
        if (otherStateDateField != "" && otherStateDateField != "null") {

            oListItem.set_item("Other", otherStateDateField);
        } else {
            oListItem.set_item("Other", "");
        }
    }

    if (addSiteValue == "India") {
        if (availSpliting != "" && availSpliting != "null") {
            oListItem.set_item("Singapore", availSpliting);
        } else {
            oListItem.set_item("Singapore", "");
        }

        if (fuzariahDataField != "" && fuzariahDataField != "null") {
            oListItem.set_item("Fujairah", fuzariahDataField);
        } else {
            oListItem.set_item("Fujairah", "");
        }
        if (stringDate != "" && stringDate != "null") {
            oListItem.set_item("India", stringDate);
        } else {
            oListItem.set_item("India", "");
        }
        if (usDataField != "" && usDataField != "null") {
            oListItem.set_item("US", usDataField);
        } else {
            oListItem.set_item("US", "");
        }
        if (nlDataField != "" && nlDataField != "null") {
            oListItem.set_item("NL", nlDataField);
        } else {
            oListItem.set_item("NL", "");
        }
        if (australiaDataField != "" && australiaDataField != "null") {
            oListItem.set_item("Australia", australiaDataField);
        } else {
            oListItem.set_item("Australia", "");
        }

        if (partialSpliting != "" && partialSpliting != "null") {
            oListItem.set_item("PartiallyAvailable", partialSpliting);
        } else {
            oListItem.set_item("PartiallyAvailable", "");
        }
        if (leaveSpliting != "" && leaveSpliting != "null") {
            oListItem.set_item("Leave", leaveSpliting);
        } else {
            oListItem.set_item("Leave", "");
        }
        if (otherStateDateField != "" && otherStateDateField != "null") {

            oListItem.set_item("Other", otherStateDateField);
        } else {
            oListItem.set_item("Other", "");
        }
    }

    if (addSiteValue == "Fujairah") {
        if (availSpliting != "" && availSpliting != "null") {
            oListItem.set_item("Singapore", availSpliting);
        } else {
            oListItem.set_item("Singapore", "");
        }

        if (stringDate != "" && stringDate != "null") {
            oListItem.set_item("Fujairah", stringDate);
        } else {
            oListItem.set_item("Fujairah", "");
        }
        if (indiaDataField != "" && indiaDataField != "null") {
            oListItem.set_item("India", indiaDataField);
        } else {
            oListItem.set_item("India", "");
        }
        if (usDataField != "" && usDataField != "null") {
            oListItem.set_item("US", usDataField);
        } else {
            oListItem.set_item("US", "");
        }
        if (nlDataField != "" && nlDataField != "null") {
            oListItem.set_item("NL", nlDataField);
        } else {
            oListItem.set_item("NL", "");
        }
        if (australiaDataField != "" && australiaDataField != "null") {
            oListItem.set_item("Australia", australiaDataField);
        } else {
            oListItem.set_item("Australia", "");
        }
        if (partialSpliting != "" && partialSpliting != "null") {
            oListItem.set_item("PartiallyAvailable", partialSpliting);
        } else {
            oListItem.set_item("PartiallyAvailable", "");
        }
        if (leaveSpliting != "" && leaveSpliting != "null") {
            oListItem.set_item("Leave", leaveSpliting);
        } else {
            oListItem.set_item("Leave", "");
        }
        if (otherStateDateField != "" && otherStateDateField != "null") {

            oListItem.set_item("Other", otherStateDateField);
        } else {
            oListItem.set_item("Other", "");
        }
    }

    if (addSiteValue == "Norway") {
        if (availSpliting != "" && availSpliting != "null") {
            oListItem.set_item("Singapore", availSpliting);
        } else {
            oListItem.set_item("Singapore", "");
        }

        if (fuzariahDataField != "" && fuzariahDataField != "null") {
            oListItem.set_item("Fujairah", fuzariahDataField);
        } else {
            oListItem.set_item("Fujairah", "");
        }
        if (indiaDataField != "" && indiaDataField != "null") {
            oListItem.set_item("India", indiaDataField);
        } else {
            oListItem.set_item("India", "");
        }
        if (stringDate != "" && stringDate != "null") {
            oListItem.set_item("US", stringDate);
        } else {
            oListItem.set_item("US", "");
        }
        if (nlDataField != "" && nlDataField != "null") {
            oListItem.set_item("NL", nlDataField);
        } else {
            oListItem.set_item("NL", "");
        }
        if (australiaDataField != "" && australiaDataField != "null") {
            oListItem.set_item("Australia", australiaDataField);
        } else {
            oListItem.set_item("Australia", "");
        }

        if (partialSpliting != "" && partialSpliting != "null") {
            oListItem.set_item("PartiallyAvailable", partialSpliting);
        } else {
            oListItem.set_item("PartiallyAvailable", "");
        }
        if (leaveSpliting != "" && leaveSpliting != "null") {
            oListItem.set_item("Leave", leaveSpliting);
        } else {
            oListItem.set_item("Leave", "");
        }
        if (otherStateDateField != "" && otherStateDateField != "null") {

            oListItem.set_item("Other", otherStateDateField);
        } else {
            oListItem.set_item("Other", "");
        }
    }

    if (addSiteValue == "NL") {
        if (availSpliting != "" && availSpliting != "null") {
            oListItem.set_item("Singapore", availSpliting);
        } else {
            oListItem.set_item("Singapore", "");
        }

        if (fuzariahDataField != "" && fuzariahDataField != "null") {
            oListItem.set_item("Fujairah", fuzariahDataField);
        } else {
            oListItem.set_item("Fujairah", "");
        }
        if (indiaDataField != "" && indiaDataField != "null") {
            oListItem.set_item("India", indiaDataField);
        } else {
            oListItem.set_item("India", "");
        }
        if (usDataField != "" && usDataField != "null") {
            oListItem.set_item("US", usDataField);
        } else {
            oListItem.set_item("US", "");
        }
        if (stringDate != "" && stringDate != "null") {
            oListItem.set_item("NL", stringDate);
        } else {
            oListItem.set_item("NL", "");
        }
        if (australiaDataField != "" && australiaDataField != "null") {
            oListItem.set_item("Australia", australiaDataField);
        } else {
            oListItem.set_item("Australia", "");
        }

        if (partialSpliting != "" && partialSpliting != "null") {
            oListItem.set_item("PartiallyAvailable", partialSpliting);
        } else {
            oListItem.set_item("PartiallyAvailable", "");
        }
        if (leaveSpliting != "" && leaveSpliting != "null") {
            oListItem.set_item("Leave", leaveSpliting);
        } else {
            oListItem.set_item("Leave", "");
        }
        if (otherStateDateField != "" && otherStateDateField != "null") {

            oListItem.set_item("Other", otherStateDateField);
        } else {
            oListItem.set_item("Other", "");
        }
    }

    if (addSiteValue == "Australia") {
        if (availSpliting != "" && availSpliting != "null") {
            oListItem.set_item("Singapore", availSpliting);
        } else {
            oListItem.set_item("Singapore", "");
        }

        if (fuzariahDataField != "" && fuzariahDataField != "null") {
            oListItem.set_item("Fujairah", fuzariahDataField);
        } else {
            oListItem.set_item("Fujairah", "");
        }
        if (indiaDataField != "" && indiaDataField != "null") {
            oListItem.set_item("India", indiaDataField);
        } else {
            oListItem.set_item("India", "");
        }
        if (usDataField != "" && usDataField != "null") {
            oListItem.set_item("US", usDataField);
        } else {
            oListItem.set_item("US", "");
        }
        if (nlDataField != "" && nlDataField != "null") {
            oListItem.set_item("NL", nlDataField);
        } else {
            oListItem.set_item("NL", "");
        }
        if (stringDate != "" && stringDate != "null") {
            oListItem.set_item("Australia", stringDate);
        } else {
            oListItem.set_item("Australia", "");
        }


        if (partialSpliting != "" && partialSpliting != "null") {
            oListItem.set_item("PartiallyAvailable", partialSpliting);
        } else {
            oListItem.set_item("PartiallyAvailable", "");
        }
        if (leaveSpliting != "" && leaveSpliting != "null") {
            oListItem.set_item("Leave", leaveSpliting);
        } else {
            oListItem.set_item("Leave", "");
        }
        if (otherStateDateField != "" && otherStateDateField != "null") {

            oListItem.set_item("Other", otherStateDateField);
        } else {
            oListItem.set_item("Other", "");
        }

    }


    if (addSiteValue == "PartiallyAvailable") {
        if (availSpliting != "" && availSpliting != "null") {
            oListItem.set_item("Singapore", availSpliting);
        } else {
            oListItem.set_item("Singapore", "");
        }

        if (fuzariahDataField != "" && fuzariahDataField != "null") {
            oListItem.set_item("Fujairah", fuzariahDataField);
        } else {
            oListItem.set_item("Fujairah", "");
        }
        if (indiaDataField != "" && indiaDataField != "null") {
            oListItem.set_item("India", indiaDataField);
        } else {
            oListItem.set_item("India", "");
        }
        if (usDataField != "" && usDataField != "null") {
            oListItem.set_item("US", usDataField);
        } else {
            oListItem.set_item("US", "");
        }
        if (nlDataField != "" && nlDataField != "null") {
            oListItem.set_item("NL", nlDataField);
        } else {
            oListItem.set_item("NL", "");
        }
        if (australiaDataField != "" && australiaDataField != "null") {
            oListItem.set_item("Australia", australiaDataField);
        } else {
            oListItem.set_item("Australia", "");
        }

        if (stringDate != "" && stringDate != "null") {
            oListItem.set_item("PartiallyAvailable", stringDate);
        } else {
            oListItem.set_item("PartiallyAvailable", "");
        }
        if (leaveSpliting != "" && leaveSpliting != "null") {
            oListItem.set_item("Leave", leaveSpliting);
        } else {
            oListItem.set_item("Leave", "");
        }
        if (otherStateDateField != "" && otherStateDateField != "null") {

            oListItem.set_item("Other", otherStateDateField);
        } else {
            oListItem.set_item("Other", "");
        }

    }

    if (addSiteValue == "OnLeave") {
        if (availSpliting != "" && availSpliting != "null") {
            oListItem.set_item("Singapore", availSpliting);
        } else {
            oListItem.set_item("Singapore", "");
        }

        if (fuzariahDataField != "" && fuzariahDataField != "null") {
            oListItem.set_item("Fujairah", fuzariahDataField);
        } else {
            oListItem.set_item("Fujairah", "");
        }
        if (indiaDataField != "" && indiaDataField != "null") {
            oListItem.set_item("India", indiaDataField);
        } else {
            oListItem.set_item("India", "");
        }
        if (usDataField != "" && usDataField != "null") {
            oListItem.set_item("US", usDataField);
        } else {
            oListItem.set_item("US", "");
        }
        if (nlDataField != "" && nlDataField != "null") {
            oListItem.set_item("NL", nlDataField);
        } else {
            oListItem.set_item("NL", "");
        }
        if (australiaDataField != "" && australiaDataField != "null") {
            oListItem.set_item("Australia", australiaDataField);
        } else {
            oListItem.set_item("Australia", "");
        }
        if (partialSpliting != "" && partialSpliting != "null") {
            oListItem.set_item("PartiallyAvailable", partialSpliting);
        } else {
            oListItem.set_item("PartiallyAvailable", "");
        }
        if (stringDate != "" && stringDate != "null") {

            oListItem.set_item("Leave", stringDate);
        } else {
            oListItem.set_item("Leave", "");
        }
        if (otherStateDateField != "" && otherStateDateField != "null") {

            oListItem.set_item("Other", otherStateDateField);
        } else {
            oListItem.set_item("Other", "");
        }

    }
    if (addSiteValue == "Cancel") {
        if (availSpliting != "" && availSpliting != "null") {
            oListItem.set_item("Singapore", availSpliting);
        } else {
            oListItem.set_item("Singapore", "");
        }

        if (fuzariahDataField != "" && fuzariahDataField != "null") {
            oListItem.set_item("Fujairah", fuzariahDataField);
        } else {
            oListItem.set_item("Fujairah", "");
        }
        if (indiaDataField != "" && indiaDataField != "null") {
            oListItem.set_item("India", indiaDataField);
        } else {
            oListItem.set_item("India", "");
        }
        if (usDataField != "" && usDataField != "null") {
            oListItem.set_item("US", usDataField);
        } else {
            oListItem.set_item("US", "");
        }
        if (nlDataField != "" && nlDataField != "null") {
            oListItem.set_item("NL", nlDataField);
        } else {
            oListItem.set_item("NL", "");
        }
        if (australiaDataField != "" && australiaDataField != "null") {
            oListItem.set_item("Australia", australiaDataField);
        } else {
            oListItem.set_item("Australia", "");
        }
        if (partialSpliting != "" && partialSpliting != "null") {
            oListItem.set_item("PartiallyAvailable", partialSpliting);
        } else {
            oListItem.set_item("PartiallyAvailable", "");
        }
        if (leaveSpliting != "" && leaveSpliting != "null") {

            oListItem.set_item("Leave", leaveSpliting);
        } else {
            oListItem.set_item("Leave", "");
        }
        if (otherStateDateField != "" && otherStateDateField != "null") {

            oListItem.set_item("Other", otherStateDateField);
        } else {
            oListItem.set_item("Other", "");
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

function getSavedSubmitData(SiteUrl, addFieldValue, monthField, yearField) {
    dfcRetriveItem = $.Deferred();

    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('Data_AvailabilitySheet');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='Name' /><Value Type='Lookup'>" + addFieldValue + "</Value></Eq><And><Eq><FieldRef Name='Month' /><Value Type='Text'>" + monthField + "</Value></Eq><Eq><FieldRef Name='Year' /><Value Type='Text'>" + yearField + "</Value></Eq></And></And></Where></Query></View>");
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
        listSaSuInfo = oListItem.get_item('Singapore') + ":" + oListItem.get_item('India') + ":" + oListItem.get_item('Fujairah') + ":" + oListItem.get_item('US') + ":" + oListItem.get_item('NL') + ":" + oListItem.get_item('Australia') + ":" + oListItem.get_item('PartiallyAvailable') + ":" + oListItem.get_item('Leave') + ":" + oListItem.get_item('SingaporeHoliday') + ":" + oListItem.get_item('FuzariahHoliday') + ":" + oListItem.get_item('Other');

        itemID = oListItem.get_item('ID');


    }

    dfcRetriveItem.resolve(itemID, listSaSuInfo);
}

function onQueryRetrieveFailed(sender, args) {

    //alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcRetriveItem.reject();
}

function getSavedHolidayData(SiteUrl, monthField, yearField) {
    dfcRetriveHolidayItem = $.Deferred();

    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('AvailabilitySheet_Holiday');
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

function onQueryRetrieveHolidayFailed(sender, args) {

    //alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcRetriveHolidayItem.reject();
}

function loadlist() {
    dfcloadList = $.Deferred();
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var oDataUrl = siteUrl + "/_api/web/lists/getbytitle('Names_Timesheet')/items?$select=Title,ID,AvailabilitySheet&$orderby=Title asc";
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

        if (lstitem.AvailabilitySheet== "Yes") {
            $("#names").append("<option value=" + lstitem.ID + ">" + lstitem.Title + "</option>");
        }
        loadsitelist();
    }

    dfcloadList.resolve();
}

function onerror(lstdata, errCode, errMessage) {
    alert("Error: " + errMessage);
    dfcloadList.reject();
}

function loadsitelist() {
    dfcloadSiteList = $.Deferred();
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var oDataUrl = siteUrl + "/_api/web/lists/getbytitle('Site_Timesheet')/items?$select=Title,ID &$orderby=Title asc";
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
    return dfcloadSiteList.promise();
}

function onsuccess1(lstdata) {
    $("#site").empty();
    $("#site").append("<option value=" + "ChooseSite" + " >" + "Select Location" + "</option>");
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var lstitem1 = lstdata.d.results[i];

        if (lstitem1.Title != "Australia") {
            $("#site").append("<option value=" + lstitem1.ID + ">" + lstitem1.Title + "</option>");
        }
    }

    dfcloadSiteList.resolve();
}

function onerror1(lstdata, errCode, errMessage) {
    alert("Error: " + errMessage);
    dfcloadSiteList.reject();
}

function onerror(lstdata, errCode, errMessage) {
    alert("Error: " + errMessage);
    dfcloadList.reject();
}

function changeMonthYear(dateText, inst) {
    $('.ui-datepicker-month').val(inst.selectedMonth).change();
    $('.ui-datepicker-year').val(inst.selectedYear).change();
}

function renderTable(dateText, inst) {
    $("#bg_blocking_layer").show();
    $('.renderPlaceHolder').hide();
    $('.date-picker').show();
    $('.date-picker').datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));

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

    var renderTableHTML = '<div class="renderData yearDate"><table><tr style="margin-left: 26px;"><td style="padding-left:5px;">Year  :</td><td>' + yearDate + '</td><td style="padding-left:300px;">Month  :</td><td>' + monthDate + '</td><td style="padding-left:219px;">Week  :</td><td>' + weekNumStart + '-' + weekNumEnd + '</td></tr></table></div>'
    renderTableHTML += "<table class='renderTable'><tr>";
    renderMonthTdHTML = "";


    renderTableHTML += '<th  style="padding: 14px;width:250px;">Employee Name</th>';
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
    renderNames();
    //getDataFromList(SiteUrl);

}

function renderNames() {
    dfcRenderloadList = $.Deferred();
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var oDataUrl = siteUrl + "/_api/web/lists/getbytitle('Names_Timesheet')/items?$select=Title,ID,AvailabilitySheet&$orderby=Title asc";
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

        if (renderitem.AvailabilitySheet== "Yes") {

            renderNamesTableHTML += '<tr class="' + renderitem.ID + '"><td class="names ' + renderitem.ID + '" type="text" name="fname" placeholder="' + renderitem.Title + '" disabled style="width:250px;">' + renderitem.Title + '</td>' + renderMonthTdHTML + '</tr>';

        }

    }
    //renderNamesTableHTML+="</table>";
    $('.renderTable').append(renderNamesTableHTML);
    getDataFromList(SiteUrl);
    dfcRenderloadList.resolve();
}

function onerrorRender(lstdata, errCode, errMessage) {
    alert("Error: " + errMessage);
    dfcRenderloadList.reject();
}

function renderColorCodes() {
    dfcRenderColorloadList = $.Deferred();
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var oDataUrl = siteUrl + "/_api/web/lists/getbytitle('Site_Timesheet')/items?$select=Title,ID&$orderby=Title asc";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: onsuccessRenderColor,
        error: onerrorRenderColor
    });
    return dfcRenderColorloadList.promise();
}

function onsuccessRenderColor(lstdata) {

    var renderNamesTableHTML = ""; //"<table class='renderTable'>";
    for (var i = 0; i < lstdata.d.results.length; i++) {
        var renderitem = lstdata.d.results[i];
        if (renderitem.Title != "Australia") {
            renderNamesTableHTML += '<tr><td class="' + renderitem.Title + '" type="text" name="fname" placeholder="' + renderitem.Title + '"  >' + renderitem.Title + '</td><></tr>';
        }


    }
    renderNamesTableHTML += '<tr><td class="OtherItem" type="text" name="fname" placeholder="Other"  >Other</td><></tr>';
    //renderNamesTableHTML+="</table>";
    $('.renderColorTable').append(renderNamesTableHTML);

    renderDataColorCodes();
    dfcRenderColorloadList.resolve();
}

function onerrorRenderColor(lstdata, errCode, errMessage) {
    alert("Error: " + errMessage);
    dfcRenderColorloadList.reject();
}

function renderDataColorCodes() {
    dfcRenderDataColorloadList = $.Deferred();
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var oDataUrl = siteUrl + "/_api/web/lists/getbytitle('Availability_AvailabilitySheet')/items?$select=Title,ID&$orderby=ID asc";
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

    var renderNamesTableHTML = ""; //"<table class='renderTable'>";

    for (var i = 0; i < lstdata.d.results.length; i++) {
        renderNamesTableHTML = "";
        var renderitem = lstdata.d.results[i];
        if (renderitem.Title != "SingaporeHoliday" && renderitem.Title != "FujairahHoliday") {
            //renderNamesTableHTML+='<tr class="'+renderitem.ID+'"><td class="'+renderitem.Title+'" type="text" name="fname" placeholder="'+renderitem.Title+'" disabled >'+renderitem.Title+'</td></tr>';
            renderNamesTableHTML = '&nbsp;<td class="' + renderitem.Title + '" type="text" name="fname" placeholder="' + renderitem.Title + '" >' + renderitem.Title + '</td>';
            if (renderitem.Title == 'PartiallyAvailable') {
                $('.Fujairah').closest('tr').append(renderNamesTableHTML);
            } else if (renderitem.Title == 'OnLeave') {
                $('.India').closest('tr').append(renderNamesTableHTML);
            } else if (renderitem.Title == 'Cancel') {
                $('.NL').closest('tr').append(renderNamesTableHTML);
            }
        }
    }

    //renderNamesTableHTML+="</table>";
    //$('.renderColorTable').append(renderNamesTableHTML);
    renderHolidayCodes();
    $(".Australia, .Fujairah, .India, .NL, .Norway, .Singapore,.OnLeave,.PartiallyAvailable,.Cancel").on('click dblclick', function() {
        $("#bg_blocking_layer").show();
        $('.selectedAvail').removeClass('selectedAvail');

        addSiteValue = $(this).text();
        siteData = "";
        $(this).addClass('selectedAvail');
        dataSubmit(siteData);

    });

    $(".OtherItem").on('click dblclick', function() {

        $("#bg_blocking_layer").show();
        $('.selectedAvail').removeClass('selectedAvail');
        addSiteValue = $(this).text();
        $(this).addClass('selectedAvail');
        var siteData = $('.descriptionSite').val("");

        modalSite = document.getElementById('OtherItemSite');
        $("#bg_blocking_layer").hide();

        modalSite.style.display = "block";

        $('.date-picker').hide();

    });
    <!-- <!-- $(".onleave,.partiallyavailable,.cancel").click(function() { --> -->
    <!-- <!-- $('.selectedavail').removeclass('selectedavail'); --> -->
    <!-- <!-- addsitevalue=""; --> -->
    <!-- <!-- availablefield=$(this).text(); --> -->
    <!-- <!-- $(this).addclass('selectedavail'); --> -->
    <!-- <!-- datasubmit(); --> -->
    <!-- });  -->

    dfcRenderDataColorloadList.resolve();
}

function onerrorRenderDataColor(lstdata, errCode, errMessage) {
    alert("Error: " + errMessage);
    dfcRenderDataColorloadList.reject();
}

function renderHolidayCodes() {
    dfcRenderHolidayloadList = $.Deferred();
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var oDataUrl = siteUrl + "/_api/web/lists/getbytitle('Availability_AvailabilitySheet')/items?$select=Holiday_RP,ID&$orderby=Title asc";
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

       if(renderitem.Holiday_RP!=null){
		renderHolidayTableHTML += '<tr class="' + renderitem.ID + '"><td class="' + renderitem.Holiday_RP + '" type="text" name="fname" placeholder="' + renderitem.Holiday_RP + '"  >' + renderitem.Holiday_RP + '</td></tr>';

    }

    }
    renderHolidayTableHTML += '<tr class="cancelHoliday"><td class="cancelHoliday" type="text" name="fname" placeholder="cancelHoliday">Cancel</td></tr>';
    //renderNamesTableHTML+="</table>";
    $('.renderHolidayTable').append(renderHolidayTableHTML);

    $(".SingaporeHoliday,.FujairahHoliday,.IndiaHoliday").on('click dblclick', function() {
        $("#bg_blocking_layer").show();
        $('.selectedAvail').removeClass('selectedAvail');
        addHolidayValue = $(this).text();
        $(this).addClass('selectedAvail');
        var descriptionData = $('.descriptionData').val("");
        modalDescription = document.getElementById('descriptionHoliday');
        $("#bg_blocking_layer").hide();

        modalDescription.style.display = "block";



    });
    $(".cancelHoliday").on('click dblclick', function() {
        $("#bg_blocking_layer").show();
        $('.selectedAvail').removeClass('selectedAvail');
        addHolidayValue = $(this).text();
        $(this).addClass('selectedAvail');
        $("#bg_blocking_layer").hide();
        dataHolidaySubmit("Cancel");
    });
    dfcRenderHolidayloadList.resolve();
}

function onerrorRenderHoliday(lstdata, errCode, errMessage) {
    alert("Error: " + errMessage);
    dfcRenderHolidayloadList.reject();
}
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = ((today - onejan + 1) / 86400000);
    return Math.ceil(dayOfYear / 7)
};

function renderInit() {
    $("#bg_blocking_layer").show();
    $('.renderPlaceHolder').hide();
    $('.date-picker').show();

    if (renderStartDate == "" || renderStartDate == null) {
        var param1 = new Date();

    } else {
        var param1 = renderStartDate;
    }
    $('.date-picker').datepicker("setDate", param1);
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
    renderTableHTML += '<th style="padding: 14px; width:250px;">Employee Name</th>';
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
    renderNames();
    //getDataFromList(SiteUrl);
}

function getDataFromList(SiteUrl) {
    dfcListRetriveItem = $.Deferred();

    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('Data_AvailabilitySheet');
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

        //listSaSuInfo =oListItem.get_item('Available')+":"+oListItem.get_item('PartiallyAvailable')+":"+oListItem.get_item('Leave');
        listSaSuInfo = oListItem.get_item('Singapore') + ":" + oListItem.get_item('India') + ":" + oListItem.get_item('Fujairah') + ":" + oListItem.get_item('US') + ":" + oListItem.get_item('NL') + ":" + oListItem.get_item('Other') + ":" + oListItem.get_item('PartiallyAvailable') + ":" + oListItem.get_item('Leave') + ":" + oListItem.get_item('Name').get_lookupValue() + ":" + oListItem.get_item('Month') + ":" + oListItem.get_item('SingaporeHoliday') + ":" + oListItem.get_item('FuzariahHoliday');
        ListData = listSaSuInfo.split(":");
        singaporeDataSpliting = ListData[0].split(";");
        indiaDataSpliting = ListData[1].split(";");
        fujairahDataSpliting = ListData[2].split(";");
        USDataSpliting = ListData[3].split(";");
        NLDataSpliting = ListData[4].split(";");
        otherDataSpliting = ListData[5].split(";");
        partialDataSpliting = ListData[6].split(";");
        leaveDataSpliting = ListData[7].split(";");
        nameDataSpliting = ListData[8].split(";");
        monthDataSpliting = ListData[9].split(";");
        singaporeHolidayDataSpliting = ListData[10].split(";");
        FuzariahHolidayDataSpliting = ListData[11].split(";");
        itemID = oListItem.get_item('ID');

        var findTr = $('td[placeholder="' + oListItem.get_item('Name').get_lookupValue() + '"]').closest('tr').find('.data');
        var imgSing = "<img  width='19' height='15' src='/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/cream_Singapore.png'/>";
        var imgIndia = "<img width='19' height='15' src='/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/blue_india.png'/>";
        var imgFuz = "<img width='19' height='15' src='/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/violet_fujairah.png'/>";
        var imgUS = "<img  width='19' height='15' src='/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/darkBlue_US.png'/>";
        var imgNL = "<img  width='19' height='15' src='/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/Orange_NL.png'/>";
        var imgAus = "<img  width='19' height='15' src='/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/reddish_australia.png'/>";

        var imgPartial = "<img width='19' height='15' src='/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/yellowp.png'/>";
        var imgLeave = "<img width='19' height='15' src='/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/red-100630172-orig.jpg' />";
        var imgFuzH = "<img width='19' height='15' src='/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/violet.png' />";
        var imgSingH = "<img width='19' height='15' src='/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/pinky.png' />";

        for (var i = 0; i <= singaporeDataSpliting.length; i++) {
            renderingTdData(findTr, singaporeDataSpliting[i], imgSing);

        }
        for (var i = 0; i <= indiaDataSpliting.length; i++) {
            renderingTdData(findTr, indiaDataSpliting[i], imgIndia);

        }
        for (var i = 0; i <= fujairahDataSpliting.length; i++) {
            renderingTdData(findTr, fujairahDataSpliting[i], imgFuz);

        }
        for (var i = 0; i <= USDataSpliting.length; i++) {
            renderingTdData(findTr, USDataSpliting[i], imgUS);

        }
        for (var i = 0; i <= NLDataSpliting.length; i++) {
            renderingTdData(findTr, NLDataSpliting[i], imgNL);

        }
        for (var i = 0; i <= otherDataSpliting.length; i++) {
            if (otherDataSpliting[i] != null && otherDataSpliting[i] != "undefined" && otherDataSpliting[i] != "null") {
                otherSplit = otherDataSpliting[i].split('|');
                renderingTdOtherData(findTr, otherSplit[0], imgAus, otherSplit[1]);
            }
        }
        for (var i = 0; i <= leaveDataSpliting.length; i++) {
            renderingTdData(findTr, leaveDataSpliting[i], imgLeave);

        }
        for (var i = 0; i <= partialDataSpliting.length; i++) {
            renderingTdData(findTr, partialDataSpliting[i], imgPartial);
        }
        for (var i = 0; i <= singaporeHolidayDataSpliting.length; i++) {
            renderingTdData(findTr, singaporeHolidayDataSpliting[i], imgSingH);
        }
        for (var i = 0; i <= FuzariahHolidayDataSpliting.length; i++) {
            renderingTdData(findTr, FuzariahHolidayDataSpliting[i], imgFuzH);
        }

    }
    $('.renderPlaceHolder').show();
    $("#bg_blocking_layer").hide();
    getHolidayDataFromList(SiteUrl);
    dfcListRetriveItem.resolve(itemID, listSaSuInfo);
}

function onQuerygetDataFromListFailed(sender, args) {

    //alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    dfcListRetriveItem.reject();
}

function getHolidayDataFromList(SiteUrl) {
    dfcHolidayRetriveItem = $.Deferred();

    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('AvailabilitySheet_Holiday');
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
        var imgSingHoliday = "url('/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/pinky.png')";
        var imgFuzHoliday = "url('/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/violet.png')";
		 var imgindiaHoliday = "url('/sites/ProjectWSSSA/Execution/SiteAssets/AvailabilitySheet/blue_india.png')";


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
    //$('.renderPlaceHolder').show();
	
   

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

function renderingTdOtherData(currentRow, value, image, valTitle) {
    $('image').width('19px');
    $('image').height('15px');
    currentRow.each(function() {
        var currentTd = $(this);
        var classNames = $(this).attr("class").toString().split(' ');
        $.each(classNames, function(j, className) {
            if (value == className) {

                currentTd.append(image);
                currentTd.css("margin-top", "3px");
                currentTd.addClass('selectedClass');
                currentTd.attr("Title", valTitle);
            }
        });
    });
}

function renderingTdData(currentRow, value, image) {
    $('image').width('19px');
    $('image').height('15px');
    currentRow.each(function() {
        var currentTd = $(this);
        var classNames = $(this).attr("class").toString().split(' ');
        $.each(classNames, function(j, className) {
            if (value == className) {

                currentTd.append(image);
                currentTd.css("margin-top", "3px");
                currentTd.addClass('selectedClass');
            }
        });
    });
}

function addDataintoList(siteMainUrl, lkaddFieldValue, addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField) {
    $("#bg_blocking_layer").hide();

    if (itemID == 0) {
        var resultAdd = addListItem(siteMainUrl, "Data_AvailabilitySheet", lkaddFieldValue, addSiteValue, stringDate, monthField, yearField);
        resultAdd.done(function() {

            $('.dateClass').val('');
            $('#avail').val('choose');
            loadlist();

            $('.selectedAvail').removeClass('selectedAvail');
            $("#bg_blocking_layer").show();

            renderInit();

        });
        resultAdd.fail(function(arg) {
            alert(arg);
        });
    } else {

        var resultAdd = updateListItem(siteMainUrl, "Data_AvailabilitySheet", addSiteValue, stringDate, monthField, yearField, itemID, newDateFieldRange, singaporeDataField, indiaDataField, fuzariahDataField, usDataField, nlDataField, australiaDataField, leaveDataField, partialDataField, otherStateDateField);
        resultAdd.done(function() {

            $('.dateClass').val('');
            $('#avail').val('choose');
            loadlist();
            $('.selectedAvail').removeClass('selectedAvail');
            $("#bg_blocking_layer").show();
            renderInit();


        });
        resultAdd.fail(function(arg) {
            alert(arg);
        });

    }
}

function changingValueForSite(arr1, arr2) {
    var finalValue = "";
    var afterRemovingNFIn = removeValues(arr1, arr2); //india
    var afterEmptyNFIn = removeEmptyValues(afterRemovingNFIn);
    afterEmptyNFIn = afterEmptyNFIn.sort();
    finalValue = afterEmptyNFIn.join(";");
    return finalValue;
}

function changingValueForOtherSite(arr1, arr2) {
    var finalValue = "";
    var afterRemovingNFIn = removeValuesOtherSite(arr1, arr2); //india
    var afterEmptyNFIn = removeEmptyValues(afterRemovingNFIn);
    afterEmptyNFIn = afterEmptyNFIn.sort();
    finalValue = afterEmptyNFIn.join(";");
    return finalValue;
}

function changingValueForOtherSiteNo(arr1, arr2) {
    var finalValue = "";
    var afterRemovingNFIn = removeValuesOtherSiteNo(arr1, arr2); //india
    var afterEmptyNFIn = removeEmptyValues(afterRemovingNFIn);
    afterEmptyNFIn = afterEmptyNFIn.sort();
    //finalValue = afterEmptyNFIn.join(";");
    return afterEmptyNFIn;
}

function changingValueForTwoOtherSiteNo(arr1, arr2) {
    var finalValue = "";
    var afterRemovingNFIn = removeValuesTwoOtherSiteNo(arr1, arr2); //india
    var afterEmptyNFIn = removeEmptyValues(afterRemovingNFIn);
    afterEmptyNFIn = afterEmptyNFIn.sort();
    //finalValue = afterEmptyNFIn.join(";");
    return afterEmptyNFIn;
}

function changingValueForOtherNewSite(arr1, arr2) {
    var finalValue = "";
    var afterRemovingNFIn = removeValuesSite(arr1, arr2); //india
    var afterEmptyNFIn = removeEmptyValues(afterRemovingNFIn);
    afterEmptyNFIn = afterEmptyNFIn.sort();
    finalValue = afterEmptyNFIn.join(";");
    return finalValue;
}

function removeValuesOtherSite(arr1, arr2) {
    for (i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] == arr2[j].split('|')[0]) {
                arr1[i] = "";
            }
        }

    }
    return arr1
}

function removeValuesSite(arr1, arr2) {
    for (i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] == arr2[j].split('|')[0]) {
                arr2[j] = "";
            }
        }

    }
    return arr2
}

function removeValuesOtherSiteNo(arr1, arr2) {

    for (i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] != "" && arr2[j] != "" && arr2[j] != undefined) {
                if (arr1[i].split('|')[0] == arr2[j]) {
                    arr1[i] = "";
                }
            }
        }

    }
    return arr1
}

function removeValuesTwoOtherSiteNo(arr1, arr2) {

    for (i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] != "" && arr2[j] != "" && arr2[j] != undefined) {
                if (arr1[i].split('|')[0] == arr2[j].split('|')[0]) {
                    arr1[i] = "";
                }
            }
        }

    }
    return arr1
}

function removeValuesOtherNewSiteNo(arr1, arr2) {

    for (i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] != "" && arr2[j] != "" && arr2[j] != undefined) {
                if (arr1[i].split('|')[0] == arr2[j].split('|')[0]) {
                    arr1[i] = "";
                }
            }
        }

    }
    return arr1
}

function changingValueForHolidaySite(arr1, arr2) {
    var finalValue = "";
    var afterRemovingNFIn = removeHolidayValues(arr1, arr2); //india
    var afterEmptyNFIn = removeEmptyValues(afterRemovingNFIn);
    afterEmptyNFIn = afterEmptyNFIn.sort();
    finalValue = afterEmptyNFIn.join(";");
    return finalValue;
}