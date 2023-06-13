const btnAdd: HTMLElement = document.getElementById("btn-add") as HTMLElement;
const contactWrapper: HTMLElement = document.getElementById("contacts-wrapper") as HTMLElement;
const inputContactName: HTMLInputElement | null = document.getElementById("add-contact-input") as HTMLInputElement;
let isUpdating: boolean = false;
let updatingId: number = 0;


type TContact = {
    contactName: string
    id: number
}

type TContactDTO = {
    contactName: string
}

interface IContact{
    createContact(contact: TContactDTO): void;
    deleteContact(contactID: number): void;
    editContact(contact: TContact): void;
    reloadContact(): void;
}


abstract class ContactRepository implements IContact{

    contacts: TContact[];

    constructor(){
        this.contacts = [];
    }

    public createContact(contact: TContactDTO): void {}
    public deleteContact(contactID: number): void {}
    public editContact(contact: TContact): void {}
    public reloadContact(): void {}

}

class ContactController extends ContactRepository{

    constructor(){
        super();
    }

    public createContact(contact: TContactDTO): void {
        
        const id: number = this.contacts.length + 1;

        const newContact: TContact = {
            contactName: contact.contactName,
            id
        }

        this.contacts.push(newContact);


    }

    public deleteContact(contactID: number): void {
        this.contacts.splice(contactID - 1 , 1);

        console.log(this.contacts);
        
    }

    public editContact(contact: TContact): void {
        
        this.contacts[contact.id - 1] = contact;
    }

    public reloadContact(): void {
    
        contactWrapper.innerHTML = "";

        for (let iterator of this.contacts) {

            const newContactElement: HTMLElement = document.createElement("div");

            const contactName = iterator.contactName;
            const contactID = iterator.id;

            newContactElement.innerHTML += `
            <div class="d-flex justify-content-between bg-light my-2 align-items-center w-100 px-2 py-1 rounded-1"  data-id="${contactID}">
                <p class="mb-0">${contactName}</p>
                <div>
                    <button type="button" class="btn btn-warning flex-grow-0 ms-2" id="btn-edit">ویرایش</button>
                    <button type="button" class="btn btn-danger flex-grow-0 ms-2" id="btn-delete">حذف</button>
                </div>
            </div>`;

            contactWrapper.appendChild(newContactElement);
        }
    }
    
}


const contact = new ContactController();


btnAdd.addEventListener("click" , (): void => {


    if(isUpdating){

        contact.editContact({contactName: inputContactName.value , id: updatingId});
        contact.reloadContact();
        isUpdating = false;

    }else{

        if(inputContactName.value){
    
            contact.createContact({contactName: inputContactName.value})
            contact.reloadContact();
    
        }

    }


})

contactWrapper.addEventListener("click" , (event: any):void => {


    if(event.target.id === "btn-edit"){

        const contactName: string = event.target.parentElement.previousElementSibling.innerText;

        const id: number = event.target.parentElement.previousElementSibling.parentElement.dataset.id;

        isUpdating = true;
        inputContactName.value = contactName;
        updatingId = id;

    }


    if(event.target.id === "btn-delete"){


        const id: number = event.target.parentElement.previousElementSibling.parentElement.dataset.id;

        console.log(id);
        

        contact.deleteContact(id);
        contact.reloadContact();

    }
    
})






