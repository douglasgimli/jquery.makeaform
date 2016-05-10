(function($) {

    $.fn.makeaform = function(options) {

        // Default settings
        var settings = $.extend({
            'token': null,
            'secret': null,
            'modal': false,
            'fields': {
                'estado': [],
                'nível': []
            }
        }, options);

        // Fields of the form
        var nameInput, emailInput, stateSelect, levelSelect, messageBox, lightboxGroup;

        // On form is submited
        var onFormSubmit = function(event) {

            // Hide messages
            messageBox.removeClass('alert-success alert-info alert-danger');

            // Verify empty and required fields on form
            var errors = $(this).find('input[notempty="true"]').filter(function() {
                var isEmpty = this.value.length === 0;
                if (isEmpty) {
                    $(this).parent().addClass('has-error');
                }
                else {
                    $(this).parent().removeClass('has-error');
                }
                return isEmpty;
            });
            if (errors.length <= 0) {
                var name = nameInput.val();
                var email = emailInput.val();
                var state = stateSelect.val();
                var level = levelSelect.val();
                var data = {'token': settings.token,
                            'secret': settings.secret,
                            'lead': {
                                'name': name,
                                'email': email,
                                'estado': state,
                                'nível': level
                            }};

                // Show loading message
                messageBox.html('Enviando formulário...').addClass('alert-info').fadeIn();

                // Send form to service
                $.ajax({
                    method: 'POST',
                    url: 'URL-SERVICE',
                    data: data
                }).done(onFormSuccess)
                .fail(onFormError);

            }
            else {
                messageBox.fadeOut();
            }
            return false;
        }

        // On request successfull sent
        var onFormSuccess = function() {
            messageBox.html('Formulário enviado com sucesso!').removeClass('alert-info').addClass('alert-success');

            // Clear fields
            nameInput.val('');
            emailInput.val('');
        }

        // Error sending request
        var onFormError = function() {
            messageBox.html('Formulário indisponível, tente novamente mais tarde.').removeClass('alert-info').addClass('alert-danger');
        }

        // Close lightbox
        var closeLightbox = function(event) {
            event.preventDefault();
            lightboxGroup.stop().fadeOut();
        }

        // Open lightbox
        var openLightbox = function(event) {
            event.preventDefault();
            lightboxGroup.stop().fadeIn();
        }

        this.each(function() {
            var form = $('<form></form>', {
                        'class': 'makeaform__form container-fluid',
                        'on': {
                            'submit': onFormSubmit
                        }
                        });

            // Message box
            messageBox = $('<div></div>', {
                            'class': 'alert makeaform__message'
                            });

            // Name input
            var nameGroup = $('<div></div>', { 'class': 'makeaform__group form-group col-lg-12' });
            var nameLabel = $('<label></label>', { 'html': 'Nome: ', 'for': 'name', 'class': 'control-label' });
            nameInput = $('<input />', {
                            'type': 'text',
                            'name': 'name',
                            'class': 'makeaform__input form-control',
                            'placeholder': 'Seu nome',
                            'notempty': 'true',
                            });
            nameGroup.append(nameLabel);
            nameGroup.append(nameInput);

            // Email input
            var emailGroup = $('<div></div>', { 'class': 'makeaform__group form-group col-lg-12' });
            var emailLabel = $('<label></label>', { 'html': 'E-mail: ', 'for': 'email', 'class': 'control-label' });
            emailInput = $('<input />', {
                            'type': 'email',
                            'name': 'email',
                            'class': 'makeaform__input form-control',
                            'placeholder': 'Seu e-mail',
                            'notempty': 'true',
                            });
            emailGroup.append(emailLabel);
            emailGroup.append(emailInput);

            // State select
            var stateGroup = $('<div></div>', { 'class': 'makeaform__group form-group col-lg-12' });
            var stateLabel = $('<label></label>', { 'html': 'Estado: ', 'for': 'state', 'class': 'control-label' });
            stateSelect = $('<select />', {
                            'name': 'state',
                            'class': 'makeaform__input form-control'
                            });
            if (settings.fields.estado.length > 0) {
                for(var i = 0, len = settings.fields.estado.length, option ; i < len ; i++) {
                    option = $('<option></option>', { 'html': settings.fields.estado[i], 'value': settings.fields.estado[i] });
                    stateSelect.append(option);
                }
            }
            stateGroup.append(stateLabel);
            stateGroup.append(stateSelect);

            // Level select
            var levelGroup = $('<div></div>', { 'class': 'makeaform__group form-group col-lg-12' });
            var levelLabel = $('<label></label>', { 'html': 'Nível: ', 'for': 'level', 'class': 'control-label' });
            levelSelect = $('<select />', {
                            'name': 'level',
                            'class': 'makeaform__input form-control'
                            });
            if (settings.fields.nível.length > 0) {
                for(var i = 0, len = settings.fields.nível.length, option ; i < len ; i++) {
                    option = $('<option></option>', { 'html': settings.fields.nível[i], 'value': settings.fields.nível[i] });
                    levelSelect.append(option);
                }
            }
            levelGroup.append(levelLabel);
            levelGroup.append(levelSelect);

            // Submit button
            var submitGroup = $('<div></div>', { 'class': 'makeaform__group form-group col-lg-12' });
            var submit = $('<button></button>', {
                            'type': 'submit',
                            'name': 'submit',
                            'html': 'Enviar',
                            'class': 'btn btn-default'
                            });
            submitGroup.append(submit);


            // Add fields to form
            form.append(messageBox);
            form.append(nameGroup);
            form.append(emailGroup);
            form.append(stateGroup);
            form.append(levelGroup);
            form.append(submitGroup);

            if (settings.modal === true) {
                lightboxGroup = $('<div></div>', { 'class':'makeaform__lightboxgroup' });
                var lightboxBackground = $('<div></div>', { 'class': 'makeaform__lightboxbackground',
                                                            'on': {
                                                                'click': closeLightbox
                                                            }});
                var lightboxContent = $('<div></div>', { 'class':'makeaform__lightboxcontent container-fluid' });
                var lightboxClose = $('<a></a>', { 'class':'makeaform__lightboxclose',
                                                    'html':'x',
                                                    'href':'#',
                                                    'on': {
                                                        'click': closeLightbox
                                                    }});
                lightboxGroup.append(lightboxBackground);
                lightboxContent.append(lightboxClose);
                lightboxContent.append(form);
                lightboxGroup.append(lightboxContent);
                $('body').append(lightboxGroup);
                $(this).on('click', openLightbox);
            }
            else {
                $(this).html(form);
            }
        });

        return this;
    };

}(jQuery));
