import { StatusCodes } from "http-status-codes"
import { testServer} from "../jest.setup"
import { number } from "yup"



describe("Cidades-GetAll", () =>{

    it("Pesquisa todos os registros", async() =>{

    const resCreate = await testServer.post("/Cidades").send({
        nome: "São José do Rio Preto"
    })            
    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED)

    const resGetAll = await testServer
    .get("/Cidades")
    .send()            
        expect(Number(resGetAll.header['x-total-count'])).toBeGreaterThan(0)
        expect(resGetAll.statusCode).toEqual(StatusCodes.OK)
        expect(resGetAll.body.length).toBeGreaterThan(0)        
    })

    it("Tenta deletar um registro que não existe", async() =>{

        const res1 = await testServer
        .delete("/Cidades/1001")
        .send()
                
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(res1.body).toHaveProperty("errors.default")
    
    })
              
        

})