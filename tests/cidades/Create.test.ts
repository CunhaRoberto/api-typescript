import { StatusCodes } from "http-status-codes"
import { testServer} from "../jest.setup"



describe("Cidades-Create", () =>{

    it("Criar um registro", async() =>{

    const res1 = await testServer.post("/Cidades").send({
            nome: "Caxias do Sul"
        })
            
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual("number")

    })

    it("Tenta criar um registro com nome curto", async() =>{

        const res1 = await testServer.post("/Cidades").send({
                nome: "Sp"                
            })
                
            expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
            expect(res1.body).toHaveProperty("errors.body.nome")
    
        })

        it("Tenta criar um registro com atributos adicionais", async () => {
            const res1 = await testServer.post("/Cidades").send({
               cep: 2525261    // Atributo adicional que causa o erro
            });
                    
            expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);        
            expect(res1.body.errors.body[""]).toEqual("Campos adicionais não são permitidos");
        });

        it("Tenta criar um registro faltando atributos", async () => {
            const res1 = await testServer.post("/Cidades").send({
               // " sem atributos no body, o que deve gerar o erro "Este campo é obrigatório"
            });
        
           
            expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
                
            // Verifique se contém o erro de "Este campo é obrigatório"
            const errorsBody = res1.body.errors.body;
            for (const field in errorsBody) {
                expect(errorsBody[field]).toEqual("Este campo é obrigatório");
            }
        });
        
        

})