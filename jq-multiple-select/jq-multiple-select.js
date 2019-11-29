/**
 * Created by sunjianyun on 2019/11/29.
 */
function multipleSelect() {
    var lastClickedSelectIndex = '';

    /* 控制下拉框收起/展开状态 */
    $(document).on('click', '.multiple-select-body', function (e) {
        e.stopPropagation();
        var _this = $(this),
            _index = $('.multiple-select-body').index(_this),
            $select = _this.parent(),
            $options = _this.siblings('.multiple-select-options');
        if ($select.hasClass('.is-disabled')) return;
        var $allSelect = $('.multiple-select'),
            $allSelectOptions = $('.multiple-select-options');

        if (lastClickedSelectIndex !== _index) {
            $allSelectOptions.slideUp();
            $allSelect.removeClass('active');
        }

        $select.toggleClass('active');
        $options.stop().slideToggle();

        $(document).one('click', function () {
            $(".multiple-select-options ").slideUp();
            $select.removeClass('active');
        });

        lastClickedSelectIndex = _index;
        e.stopPropagation();
    });

    $(document).on('click', '.multiple-selected-label i', function (e) {
        var $label = $(this).parent(),
            $select = $label.parents('.multiple-select'),
            $selectContent = $select.find('.multiple-select-content'),
            $optionsWrapper = $select.find('.multiple-select-options'),
            $input = $select.find('input');
        var $inputValues;
        if ($input.val()) {
            $inputValues = $input.val().split(',');
        } else {
            $inputValues = [];
        }

        var $options = $select.find('.multiple-select-options li');
        var labelValue = $label.attr('data-value');
        var existPos = $inputValues.indexOf(labelValue);
        // 删除input选中值
        $inputValues.splice(existPos, 1);
        $input.val($inputValues.join(','));

        // 删除select绑定值
        $select.attr('data-value', $inputValues.join(','));

        // 取消对应高亮option
        $options.each(function (index, item) {
            var $curItem = $(item);
            var curItemValue = $(item).attr('data-value');
            if (labelValue === curItemValue) {
                $curItem.removeClass('selected');
            }
        });
        // 删除对应标签
        $label.remove();
        if ($inputValues.length > 0) {
            $selectContent.addClass('auto-height')
        } else {
            $selectContent.removeClass('auto-height')
        }
        $optionsWrapper.css('top', $selectContent.height() + 4);
        e.stopPropagation();
    });

    $(document).on('click', '.multiple-select-options li', function (e) {
        var $option = $(this),
            $options = $option.parent(),
            $select = $option.parents('.multiple-select'),
            $selectContent = $select.find('.multiple-select-content'),
            $input = $select.find('input');
        var $inputValues;
        if ($input.val()) {
            $inputValues = $input.val().split(',');
        } else {
            $inputValues = [];
        }
        var $selectedLabels = $selectContent.find('.multiple-selected-label');
        var optionValue = $option.attr('data-value');
        var optionLabel = $option.text();
        var existPos = $inputValues.indexOf(optionValue);
        if (existPos > -1) { //取消选择
            // 删除input选中值
            $inputValues.splice(existPos, 1);
            $input.val($inputValues.join(','));

            // 删除select绑定值
            $select.attr('data-value', $inputValues.join(','));

            // 删除选中标签
            $selectedLabels.each(function (index, item) {
                var $curItem = $(item);
                var curItemValue = $(item).attr('data-value');
                if (optionValue === curItemValue) {
                    $curItem.remove();
                }
            });
            // 删除对应高亮被选项
            $option.removeClass('selected');
        } else { //增加选择
            // 新增input选中值
            $inputValues.push(optionValue);
            $input.val($inputValues.join(','));

            // 新增select绑定值
            $select.attr('data-value', $inputValues.join(','));

            // 新增选中标签
            $selectContent.append('<span class="multiple-selected-label" data-value="' + optionValue + '" data-label="' + optionLabel + '"><b>' + optionLabel + '</b><i></i></span>');

            // 高亮显示被选项
            $option.addClass('selected');
        }
        if ($inputValues.length > 0) {
            $selectContent.addClass('auto-height')
        } else {
            $selectContent.removeClass('auto-height')
        }

        $options.css('top', $selectContent.height() + 4);
        $input.change();
        e.stopPropagation();
    })
}
multipleSelect();