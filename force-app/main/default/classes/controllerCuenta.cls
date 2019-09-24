public inherited sharing class controllerCuenta {
    @AuraEnabled
    public static void saveAccount(Account objAcc){
        try{
            insert objAcc;
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}