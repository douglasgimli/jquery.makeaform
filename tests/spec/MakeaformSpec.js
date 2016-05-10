describe("Makeaform", function() {
    var element;

    beforeEach(function() {
        element = $('<div id="makeaform__test"></div>').appendTo('body');
    });

    it('should create a form on initializate passing no options', function() {
        element.makeaform();
        expect(element.find('.makeaform__form').length).toBe(1);
    });

    it('should create a form on initializate passing token and secret options', function() {
        var options = {
            'token':'62bb61431348e22850828a5829c4373faafe29c1',
            'secret':'51a266c2844ccd5cac83d88de88d82d05358aa51'
        };
        element.makeaform();
        expect(element.find('.makeaform__form').length).toBe(1);
    });

    it('should create a form on initializate with two optionals fields and values', function() {
        var options = {
            'token':'62bb61431348e22850828a5829c4373faafe29c1',
            'secret':'51a266c2844ccd5cac83d88de88d82d05358aa51',
            'fields':{
                'estado':['PR','SC'],
                'nível':['Iniciante','Intermediário']
            }
        };
        element.makeaform(options);
        expect(element.find('.makeaform__form').length).toBe(1);
        expect(element.find('select[name="level"]').length).toBe(1);
        expect(element.find('select[name="level"] option').length).toBe(options.fields.nível.length);
        expect(element.find('select[name="state"]').length).toBe(1);
        expect(element.find('select[name="state"] option').length).toBe(options.fields.estado.length);
    });

    it('should return error when name and email fields are empty', function() {
        element.makeaform();
        expect(element.find('.makeaform__form').length).toBe(1);
        element.find('.makeaform__form').submit();
        expect(element.find('input[name="name"]').parent().hasClass('has-error')).toBeTruthy();
        expect(element.find('input[name="email"]').parent().hasClass('has-error')).toBeTruthy();
    });

    it('should not return error when name and email fields are not empty', function() {
        element.makeaform();
        expect(element.find('.makeaform__form').length).toBe(1);
        element.find('input[name="name"]').val('Name');
        element.find('input[name="email"]').val('email@email.com');
        element.find('.makeaform__form').submit();
        expect(element.find('input[name="name"]').parent().hasClass('has-error')).toBeFalsy();
        expect(element.find('input[name="email"]').parent().hasClass('has-error')).toBeFalsy();
    });

    afterEach(function() {
        element.remove();
    });
});
