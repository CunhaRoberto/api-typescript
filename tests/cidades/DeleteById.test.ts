import { StatusCodes } from "http-status-codes"
import { testServer} from "../jest.setup"



describe("Cidades-DeleteById", () =>{

    it("Deletar um registro", async() =>{

        const resCreate = await testServer.post("/Cidades").send({
            nome: "Caxias do Sul"
        })
            
        expect(resCreate.statusCode).toEqual(StatusCodes.CREATED)

    const resDelete = await testServer
    .delete(`/Cidades/${resCreate.body}`)
    .send()            
        expect(resDelete.statusCode).toEqual(StatusCodes.OK)
        expect(resDelete.body).toHaveProperty("message.default")

    })

    it("Tenta deletar um registro que não existe", async() =>{

        const res1 = await testServer
        .delete("/Cidades/1001")
        .send()
                
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(res1.body).toHaveProperty("errors.default")
    
    })
              
        

})