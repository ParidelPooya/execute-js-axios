const lab = require("lab").script();
const Execute = require("execute-js");
const nock = require("nock");
const executeJsAxios = require("../src/index");

exports.lab = lab;

lab.experiment("Basic Test", () => {

    lab.test("returns step coverage when there is only one step", () => {
        nock("https://api.github.com")
            .get("/users/octocat")
            .reply(200, {a:"data"});


        let executionTree = [
            {
                title:"step 1",
                actionType: "axios",
                action: () => {
                    return {
                        method: "get",
                        url: "https://api.github.com/users/octocat"
                    };
                }
            }
        ];
        let executionData = {
            sub_id :123
        };
        let execute = new Execute();
        execute.use(executeJsAxios);
        return execute.run(executionTree, executionData).then( (result)=> {
            lab.expect(result.a).to.equal("data");
        });
    });

});