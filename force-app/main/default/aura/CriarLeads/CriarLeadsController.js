({
    criarLead : function(component, event, helper) {

        // 1. Pega os valores
        var nome = component.find("Nome").get("v.value");
        var sobrenome = component.find("Sobrenome").get("v.value");
        var email = component.find("email").get("v.value");
        var empresa = component.find("empresa").get("v.value");
        var descricao = component.find("description").get("v.value");

        // 2. Referencia o método do Apex
        var action = component.get("c.SalvarLeads");
        
        // 3. Passa os parâmetros (os nomes devem ser iguais aos do método Apex)
        action.setParams({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            empresa: empresa,
            descricao: descricao
        });

        if (!sobrenome || !empresa) {
            alert('Insira os campos obrigatórios para cadastrar um novo Lead!!!!');
        }
        // 4. Define o que acontece quando o Apex responder
        action.setCallback(this, function(response) {

            var state = response.getState();

            if (state === "SUCCESS") {
                alert("Lead cadastrado com sucesso!");
                
                // Limpa os campos após o sucesso
                component.find("Nome").set("v.value", "");
                component.find("Sobrenome").set("v.value", "");
                component.find("email").set("v.value", "");
                component.find("empresa").set("v.value", "");
                component.find("description").set("v.value", "");
                // ... limpe os outros
            } else {
                console.error("Erro ao Cadastrar Lead: ", response.getError());
            }
        });

        // 5. Envia para a fila de execução
        $A.enqueueAction(action);
    }
})