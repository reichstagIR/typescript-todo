var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var btnAdd = document.getElementById("btn-add");
var contactWrapper = document.getElementById("contacts-wrapper");
var inputContactName = document.getElementById("add-contact-input");
var isUpdating = false;
var updatingId = 0;
var ContactRepository = /** @class */ (function () {
    function ContactRepository() {
        this.contacts = [];
    }
    ContactRepository.prototype.createContact = function (contact) { };
    ContactRepository.prototype.deleteContact = function (contactID) { };
    ContactRepository.prototype.editContact = function (contact) { };
    ContactRepository.prototype.reloadContact = function () { };
    return ContactRepository;
}());
var ContactController = /** @class */ (function (_super) {
    __extends(ContactController, _super);
    function ContactController() {
        return _super.call(this) || this;
    }
    ContactController.prototype.createContact = function (contact) {
        var id = this.contacts.length + 1;
        var newContact = {
            contactName: contact.contactName,
            id: id
        };
        this.contacts.push(newContact);
    };
    ContactController.prototype.deleteContact = function (contactID) {
        this.contacts.splice(contactID - 1, 1);
        console.log(this.contacts);
    };
    ContactController.prototype.editContact = function (contact) {
        this.contacts[contact.id - 1] = contact;
    };
    ContactController.prototype.reloadContact = function () {
        contactWrapper.innerHTML = "";
        for (var _i = 0, _a = this.contacts; _i < _a.length; _i++) {
            var iterator = _a[_i];
            var newContactElement = document.createElement("div");
            var contactName = iterator.contactName;
            var contactID = iterator.id;
            newContactElement.innerHTML += "\n            <div class=\"d-flex justify-content-between bg-light my-2 align-items-center w-100 px-2 py-1 rounded-1\"  data-id=\"".concat(contactID, "\">\n                <p class=\"mb-0\">").concat(contactName, "</p>\n                <div>\n                    <button type=\"button\" class=\"btn btn-warning flex-grow-0 ms-2\" id=\"btn-edit\">\u0648\u06CC\u0631\u0627\u06CC\u0634</button>\n                    <button type=\"button\" class=\"btn btn-danger flex-grow-0 ms-2\" id=\"btn-delete\">\u062D\u0630\u0641</button>\n                </div>\n            </div>");
            contactWrapper.appendChild(newContactElement);
        }
    };
    return ContactController;
}(ContactRepository));
var contact = new ContactController();
btnAdd.addEventListener("click", function () {
    if (isUpdating) {
        contact.editContact({ contactName: inputContactName.value, id: updatingId });
        contact.reloadContact();
        isUpdating = false;
    }
    else {
        if (inputContactName.value) {
            contact.createContact({ contactName: inputContactName.value });
            contact.reloadContact();
        }
    }
});
contactWrapper.addEventListener("click", function (event) {
    if (event.target.id === "btn-edit") {
        var contactName = event.target.parentElement.previousElementSibling.innerText;
        var id = event.target.parentElement.previousElementSibling.parentElement.dataset.id;
        isUpdating = true;
        inputContactName.value = contactName;
        updatingId = id;
    }
    if (event.target.id === "btn-delete") {
        var id = event.target.parentElement.previousElementSibling.parentElement.dataset.id;
        console.log(id);
        contact.deleteContact(id);
        contact.reloadContact();
    }
});
