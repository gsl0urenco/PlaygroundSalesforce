public with sharing class CriarLeads {
    String nome;
    String sobrenome;
    String email;
    String empresa;
    String descricao;

    public CriarLeads() {
    }

    @AuraEnabled
    public static string SalvarLeads(String nome, String sobrenome, String email, String empresa, String descricao){
        try {

            Lead novoLead = new Lead();

            novoLead.FirstName = nome;
            novoLead.LastName = sobrenome;
            novoLead.Email = email;
            novoLead.Company = empresa;
            novoLead.description = descricao;
            
            novoLead.Status = 'Open - Not Contacted';

            insert novoLead;
            return 'Sucesso: Lead' + novoLead.FirstName + ' ' + novoLead.LastName + ' criado com sucesso.';

        } catch (Exception e) {
            throw new AuraHandledException('Erro ao criar Lead: ' + e.getMessage());
        }
    }
}


