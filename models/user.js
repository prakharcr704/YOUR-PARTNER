const db = require('../util/database');

module.exports = class User {
    constructor(memberId,firstName,lastName,emailId,mobileNo,ageDate,ageMonth,ageYear,gender) {
        this.memberId = memberId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.mobileNo = mobileNo;
        this.ageDate = ageDate;
        this.ageMonth = ageMonth
        this.ageYear = ageYear;
        this.gender = gender;
    }

    static login(username,password){
        let  memberId;
        return db.execute("select memberID,Verified from credentials where  EmailID = '"+username+"' and '"+password+"'=password")
            .then(results=>{
                memberId = results[0];
                if(memberId.length === 1){
                    return db.execute("select Occupation from fullyregistered where MemberID = " + memberId[0].memberID)
                        .then(([result,tableDef])=>{
                            if(result.length==0){
                                return ['logInButCompleteTheProfileFirst',results[0][0].Verified];
                            }else{
                                return ['logIn',results[0][0].Verified];
                            }
                        })
                        .catch(err => console.log(err));
                }
                else
                    return 'IncorrectCredentials';
            })
            .catch(err => console.log(err));
    }

    static deleteAccount(username){
        return db.execute('delete from credentials where EmailID = "'+username+'"');
    }

    static edit(username){
        return db.execute('select * ' +
            'from onlyregistered o,fullyregistered f' +
            ' where o.MemberID = f.MemberID ' +
            "and o.EmailID = '" + username+"'")
            .then(([result,tableDef])=>{
                return result;
            })
            .catch(err => console.log(err));
    }

    static GetMobileNumber(email){
        return db.execute('select MobileNO from credentials where EmailID =? ',[email])
            .then(([results,tableDEF])=>{
                return results[0].MobileNO;
            });
    }

    static GetNewUserData(username){
        return db.execute('select * ' +
            'from onlyregistered ' +
            ' where EmailID = '+"'" + username+"'")
            .then(([result,tableDef])=>{
                return result;
            })
            .catch(err => console.log(err));
    }

    static getCredentials(email){
        return db.execute('select MemberID,EmailID,MobileNO from credentials where EmailID = ?',[email])
            .then(results=>{
                return results[0];
            })
            .catch(err => console.log(err));
    }

    static update(email,obj,option) {
        return this.getCredentials(email)
            .then(results=>{
                if(option==="first-step") {
                    return db.execute('insert into fullyregistered values (' +
                        ''+results[0].MemberID +
                        ',' +  (  obj.Occupation?('"' + obj.Occupation + '"'):'NULL' ) +
                        ',' +  (  typeof obj.Income === "number"?( obj.Income ):'NULL' ) +
                        ',' +  (  obj.Address?('"' + obj.Address + '"'):'NULL' ) +
                        ',' +  (  obj.Interest?('"' + obj.Interest + '"'):'NULL' ) +
                        ',' +  (  obj.Citizenship?('"' + obj.Citizenship + '"'):'NULL' ) +
                        ',' +  (  obj.City?('"' + obj.City + '"'):'NULL' ) +
                        ',' +  (  obj.AboutMyself?('"' + obj.AboutMyself + '"'):'NULL' ) +
                        ',' +  (  obj.Complexion?('"' + obj.Complexion + '"'):'NULL' ) +
                        ',' +  (  obj.Height?('"' + obj.Height + '"'):'NULL' ) +
                        ',' +  (  obj.Weight?('"' + obj.Weight + '"'):'NULL' ) +
                        ',' +  (  obj.Expectations?('"' + obj.Expectations + '"'):'NULL' ) +
                        ',' +  (  obj.MartialStatus?('"' + obj.MartialStatus + '"'):'NULL' ) +
                        ',' +  (  typeof obj.ChildrenStatus === "number"?(obj.ChildrenStatus):'NULL' ) +
                        ',' +  (  obj.Smoke?('"' + obj.Smoke + '"'):'NULL' ) +
                        ',' +  (  obj.Drink?('"' + obj.Drink + '"'):'NULL' ) +
                        ',' +  (  obj.HigherEducation?('"' + obj.HigherEducation + '"'):'NULL' ) +
                        ',' +  (  obj.Religion?('"' + obj.Religion + '"'):'NULL' ) +
                        ',' +  (  obj.MotherTongue?('"' + obj.MotherTongue + '"'):'NULL' ) +
                        ',' +  (  obj.FatherOccupation?('"' + obj.FatherOccupation + '"'):'NULL' ) +
                        ',' +  (  obj.MotherOccupation?('"' + obj.MotherOccupation + '"'):'NULL' ) +
                        ',' +  (  typeof obj.Sisters === "number"?(obj.Sisters):'NULL' ) +
                        ',' +  (  typeof obj.Brothers === "number"?(obj.Brothers):'NULL' ) +
                        ',' +  (  obj.FamilyType?('"' + obj.FamilyType + '"'):'NULL' ) +
                        ',' +  (  obj.SecondaryEducation?('"' + obj.SecondaryEducation + '"'):'NULL' ) +
                        ',' +  (  obj.CollegeDegree?('"' + obj.CollegeDegree + '")'):'NULL)' )
                        )
                        .then(sfsadf=>{
                            return db.execute('insert into onlyregistered values (' +
                                ''+results[0].MemberID +
                                ',"' + results[0].EmailID+
                                '","' +results[0].MobileNO +
                                '",' +  (  obj.FirstName?('"' + obj.FirstName + '"'):'NULL' ) +
                                ',' +  (  obj.LastName?('"' + obj.LastName + '"'):'NULL' ) +
                                ',' +  (  typeof(Number( obj.DOB.split('/')[0])) === "number"?( Number( obj.DOB.split('/')[0]) ):'NULL' ) +
                                ',' +  (  typeof(Number( obj.DOB.split('/')[1])) === "number"?( Number( obj.DOB.split('/')[1]) ):'NULL' ) +
                                ',' +  (  typeof(Number( obj.DOB.split('/')[2])) === "number"?( Number( obj.DOB.split('/')[2]) ):'NULL' ) +
                                ',' +  (  obj.Gender?('"' + obj.Gender + '")'):'NULL)')
                            )
                        })
                        .catch(err => console.log(err));
                }
                else{
                    return db.execute('update  fullyregistered  set ' +
                        'Occupation = ' +  (  obj.Occupation?('"' + obj.Occupation + '"'):'NULL' ) +
                        ',Income = ' +  (  typeof obj.Income === "number"?( obj.Income ):'NULL' ) +
                        ',Address =' +  (  obj.Address?('"' + obj.Address + '"'):'NULL' ) +
                        ',Interest =' +  (  obj.Interest?('"' + obj.Interest + '"'):'NULL' ) +
                        ',Citizenship = ' +  (  obj.Citizenship?('"' + obj.Citizenship + '"'):'NULL' ) +
                        ',City = ' +  (  obj.City?('"' + obj.City + '"'):'NULL' ) +
                        ',AboutMySelf = ' +  (  obj.AboutMyself?('"' + obj.AboutMyself + '"'):'NULL' ) +
                        ',Complexion = ' +  (  obj.Complexion?('"' + obj.Complexion + '"'):'NULL' ) +
                        ',Height = ' +  (  obj.Height?('"' + obj.Height + '"'):'NULL' ) +
                        ',Weight = ' +  (  obj.Weight?('"' + obj.Weight + '"'):'NULL' ) +
                        ',Expectations = ' +  (  obj.Expectations?('"' + obj.Expectations + '"'):'NULL' ) +
                        ',MartialStatus = ' +  (  obj.MartialStatus?('"' + obj.MartialStatus + '"'):'NULL' ) +
                        ',ChildrenStatus = ' +  (  typeof obj.ChildrenStatus === "number"?(obj.ChildrenStatus):'NULL' ) +
                        ',Smoke = ' +  (  obj.Smoke?('"' + obj.Smoke + '"'):'NULL' ) +
                        ',Drink = ' +  (  obj.Drink?('"' + obj.Drink + '"'):'NULL' ) +
                        ',HigherEducation = ' +  (  obj.HigherEducation?('"' + obj.HigherEducation + '"'):'NULL' ) +
                        ',Religion = ' +  (  obj.Religion?('"' + obj.Religion + '"'):'NULL' ) +
                        ',MotherTongue = ' +  (  obj.MotherTongue?('"' + obj.MotherTongue + '"'):'NULL' ) +
                        ',FatherOccupation = ' +  (  obj.FatherOccupation?('"' + obj.FatherOccupation + '"'):'NULL' ) +
                        ',MotherOccupation = ' +  (  obj.MotherOccupation?('"' + obj.MotherOccupation + '"'):'NULL' ) +
                        ',Sisters = ' +  (  typeof obj.Sisters === "number"?(obj.Sisters):'NULL' ) +
                        ',Brothers = ' +  (  typeof obj.Brothers === "number"?(obj.Brothers):'NULL' ) +
                        ',FamilyType = ' +  (  obj.FamilyType?('"' + obj.FamilyType + '"'):'NULL' ) +
                        ',SecondaryEducation = ' +  (  obj.SecondaryEducation?('"' + obj.SecondaryEducation + '"'):'NULL' ) +
                        ',CollegeDegree = ' +  (  obj.CollegeDegree?('"' + obj.CollegeDegree + '" '):'NULL ' ) +
                        'where MemberID = ' + results[0].MemberID)
                        .then(()=>{
                            return db.execute('update  onlyregistered  set ' +
                                'FirstName = ' +  (  obj.FirstName?('"' + obj.FirstName + '"'):'NULL' ) +
                                ',LastName =' +  (  obj.LastName?('"' + obj.LastName + '"'):'NULL' ) +
                                ',AgeDate =' +  ( (typeof Number(obj.DOB.split('/')[0])) === "number"?(Number(obj.DOB.split('/')[0])):'NULL' )  +
                                ',AgeMonth = ' +  ( ( typeof Number( obj.DOB.split('/')[1])) === "number"?(Number(obj.DOB.split('/')[1])):'NULL' ) +
                                ',AgeYear = ' +  (  (typeof Number(obj.DOB.split('/')[2])) === "number"?Number((obj.DOB.split('/')[2])):'NULL' ) +
                                ',Gender = ' +  (  obj.Gender?('"' + obj.Gender + '" '):'NULL ' ) +
                                'where MemberID = ' + results[0].MemberID)
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }

    static search(FirstName,LastName,filters,AgeFrom,AgeTo){
        let Query = "select * from onlyregistered o, fullyregistered f where o.MemberID = f.MemberID ";
        for(let f in filters){
            if(filters[f])
                Query += ` and ${f} = '${filters[f]}' `;
        }
        if(FirstName){
            Query += ` and soundex(FirstName) = soundex('${FirstName}')  `;
        }
        if(LastName){
            Query += ` and soundex(LastName) = soundex('${LastName}')  `;
        }

        if( AgeFrom && AgeTo )
            Query += ` and ${Date.now()/(3600000 * 24*365) +1970} - AgeYear between ${AgeFrom}  and ${AgeTo} `;
        else if(AgeFrom)
            Query += ` and ${Date.now()/(3600000 * 24*365) +1970} - AgeYear >= ${AgeFrom} `;
        else if(AgeTo)
            Query += ` and ${Date.now()/(3600000 * 24*365) +1970} - AgeYear <= ${AgeTo} `;
console.log(Query)
        return db.execute(Query)
            .then(result=>  result[0])
            .catch(err => console.log(err));
    }

    static signup(obj){
        return db.execute('insert into credentials (EmailID,MobileNO,password) values(?,?,?)',[obj.EmailID,obj.MobileNO,obj.password])
    }

    static setToken(email,token){
        return db.execute(`update credentials set resetToken = '${token}', resetTokenExpiration = ${Date.now()+ 600000} where EmailID = '${email}' `);
    }

    static changePWD(token,pwd){
        return db.execute(`update credentials set password = "${pwd}",resetToken = NULL where resetToken = '${token}' and resetTokenExpiration  >= ${Date.now()}`)

    }

    static checkToken(token){
        return db.execute(`select count(*) as rowsFound from credentials where resetToken = '${token}' and resetTokenExpiration  >= ${Date.now()}`);
    }

    static verifyEmail(email){
        return db.execute(`update credentials set Verified = 'Y' where EmailID = "${email}"`);
    }

};

