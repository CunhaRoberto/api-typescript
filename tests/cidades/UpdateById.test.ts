import { StatusCodes } from "http-status-codes"
import { testServer} from "../jest.setup"



describe("Cidades-UpdateById", () =>{

    it("Editar um registro", async() =>{

        const resCreate = await testServer.post("/Cidades").send({
            nome: "Santos"
        })
            
        expect(resCreate.statusCode).toEqual(StatusCodes.CREATED)

    const resUpdate = await testServer
    .put(`/Cidades/${resCreate.body}`)
    .send({nome: 'Catanduva'})            
        expect(resUpdate.statusCode).toEqual(StatusCodes.OK)
        expect(resUpdate.body).toHaveProperty("message.default")

    })

    it("Tenta editar um registro que não existe", async() =>{

        const res1 = await testServer
        .delete("/Cidades/1001")
        .send()
                
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(res1.body).toHaveProperty("errors.default")
    
    })
              
        

})