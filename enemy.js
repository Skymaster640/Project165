AFRAME.registerComponent("enemy-fireballs",{
    init:function(){
        setinterval(this.shootEnemyMonster,2000)
    },
    shootEnemyMonster:function(){
        var els = document.querySelectorAll(".enemy")
        
        for(var i = 0;i <els.length;i++){
            var fireball=document.createElement("a-entity")
            fireball.setAttribute("class","fireball")
            fireball.setAttribute("gltf-model","./models/fireball/scene.gltf")
            fireball.setAttribute("dynamic-body",{mass:0})

            var pos=els[i].getAttribute("position")

            fireball.setAttribute("position",{
                x:pos.x,
                y:pos.y,
                z:pos.z
            })
            fireball.setAttribute("scale",{
                x:0.05,
                y:0.05,
                z:0.05
            })
            scene.appendChild(fireball)

            var position1 = new THREE.Vector3()
            var position2 = new THREE.Vector3()

            var player = document.querySelector("#weapon").object3D
            var enemy_fireball=fireball.object3D
            player.getWorldPosition(position1)
            enemy_fireball.getWorldPosition(position2)

            var direction = new THREE.Vector3()

            direction.subVectors(position,position2).normalize()

            fireball.setAttribute("velocity",direction.multiplyScalar(2))

            /******************************************************************************************* */

            var element = document.querySelector("#countLife")
            var playerlife = parseInt(element.getAttribute("text").value)

            fireball.addEventListener("collide",function(e){
                if(e.detail.body.el.id === "weapon"){
                    if(playerlife > 0){
                        playerlife -= 1
                        element.setAttribute("text",{
                            value:playerlife
                        })
                    }
                    if(playerlife <=0){

                        var txt = document.querySelector("#over")
                        txt.setAttribute("visible",true)

                        var El = document.querySelectorAll(".enemy")
                        for(var i = 0;i < El.length;i++){
                            scene.removeChild(El)
                        }
                    }
                }
            })
        }
    }
})