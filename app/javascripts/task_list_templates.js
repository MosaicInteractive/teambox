TaskListTemplates = {

  renderAll: function(templates) {
    var placeholder = $('task_list_templates')
    templates.each(function(template) {
      var t = TaskListTemplates.render(template)
      placeholder.insert(t)
    })
  },

  render: function(template) {
    return Mustache.to_html(Templates.task_list_templates.template, template)
  },

  generateForm: function(id) {
    var e = $$('.task_list_templates[data-id=' + id + ']').first()
    if (e.down('form')) { e.down('form').remove() }
    template = _task_list_templates.find(function(e) { return e.id == id })
    e.insert(Mustache.to_html(Templates.task_list_templates.form, template))
  },

  doneEditingName: function(id, response) {
    var e = $$('.task_list_templates[data-id=' + id + ']').first()
    e.replace(TaskListTemplates.render(response))
  },

  sortable: function() {
    Sortable.create('task_list_templates', {
      handle: 'drag',
      tag: 'div',
      onChange: function(el) {
        TaskListTemplates.sendSort()
      }
    })
  },

  sendSort: function(el) {
    console.log(el)
    var ids = $$('.task_list_templates').collect(function(e) { return e.readAttribute('data-id') })
    var organization = $$('.task_list_templates').first().readAttribute('data-organization')
    new Ajax.Request('/organizations/' + organization + '/task_list_templates/reorder', {
      method: 'put',
      parameters: Sortable.serialize('task_list_templates')
    })
  }
}

document.on('ajax:success', 'form.edit_task_list_template', function(e, form) {
  var id = form.up('.task_list_templates').readAttribute('data-id')
  var response = e.memo.responseJSON
  TaskListTemplates.doneEditingName(id, response)
})

document.on('click', '.task_list_templates .name', function(e, el) {
  var t = el.up('.task_list_templates')
  TaskListTemplates.generateForm(t.readAttribute('data-id'))
  t.down('.data').hide()
})

