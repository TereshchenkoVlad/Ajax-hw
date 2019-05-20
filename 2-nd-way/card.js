class Card {
    isEdit;
    data;
    constructor(data){
        this.data = data;
        this.isEdit = false;
        this.container = document.querySelector(".wrapper");
    }

    onDelete;

    renderBlock(){
        const block = document.createElement("div");
        block.classList.add("slide-right");
        block.classList.add("block");
        block.innerHTML = `
            <h3>${this.data.name}</h3>
            <input class="hide" value="${this.data.name}">
            <h4>${this.data.age}</h4>
            <input class="hide" value="${this.data.age}">
        `;
        return block;
    }

    destroyCard(){
        this.block.remove();
    };

    renderRemoveButton(){
        const removeButton = document.createElement("img");
        removeButton.classList.add("deleteImg");
        removeButton.src = "img/delete.png";
        removeButton.addEventListener("click", () => {
            
            if(this.onDelete){
                this.onDelete(this.data._id || this.data.id);
            }
        });
        return removeButton;
    }

    renderEditBtn(){
        const editBtn = document.createElement("button");
        editBtn.classList.add("hide");
        editBtn.textContent = "Edit";
        return editBtn;
    }

    render(){
        this.block = this.renderBlock();
        this.block.append(this.renderEditBtn());
        this.block.append(this.renderRemoveButton());
        this.container.append(this.block);
    }
}