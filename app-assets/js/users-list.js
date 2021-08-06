$(function () {
  'use strict';

  var dtUserTable = $('.users-list-table'),
    newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user');

  var assetPath = '../../../app-assets/',
    userView = 'users-view.html',
    userEdit = 'users-edit.html';
  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'users/view';
    userEdit = assetPath + 'users/edit';
  }

  // Users List datatable
  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: assetPath + 'data/data-list.json', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: function(row, type, set) {
          return row.lastname + ' ' + row.name + ' ' + row.fathername;
        }},
        { data: 'role' },
        { data: 'last_access' },
        { data: '' }
      ],
      columnDefs: [

        {
          // Actions
          targets: -1,
          title: 'Действия',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-right">' +
              '<a href="' +
              userView +
              '" class="dropdown-item">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 mr-50' }) +
              'Детали</a>' +
              '<a href="' +
              userEdit +
              '" class="dropdown-item">' +
              feather.icons['archive'].toSvg({ class: 'font-small-4 mr-50' }) +
              'Редактировать</a>' +
              '</div>'
            );
            
          }
        }
      ],
      order: [[2, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-1 row mt-75"' +
        '<"col-lg-12 col-xl-6" l>' +
        '<"col-lg-12 col-xl-6 pl-xl-75 pl-0"<"dt-action-buttons text-xl-right text-lg-left text-md-right text-left d-flex align-items-center justify-content-lg-end align-items-center flex-sm-nowrap flex-wrap mr-1"<"mr-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: 'Показать _MENU_',
        search: 'Поиск',
        searchPlaceholder: 'Поиск..'
      },
      // Buttons with Dropdown
      buttons: [
        {
          text: 'Добавить пользователя',
          className: 'add-new btn btn-primary mt-50',
          attr: {
            'data-toggle': 'modal',
            'data-target': '#modals-slide-in'
          },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }
      ],
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      }
    });
  }


  // To initialize tooltip with body container
  $('body').tooltip({
    selector: '[data-toggle="tooltip"]',
    container: 'body'
  });
});
