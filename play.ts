/*
#######################################################################################
The name of source file : play.ts
The information of author :  Giho Kim #300738697
Last Modified by: Giho Kim
Last Modified date: 29 March 2016
Program Description: The game is to avoid the enemies using the side scroller. User can
control the player by a mouse and the enemies will be generated randomly. Some hearts
also will be generated as bonus. when user get a bonus, which will give a life.
Good Luck!
Revision History: 1.0
#######################################################################################
*/

// PLAY SCENE
module scenes {
    export class Play extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _forest: objects.Forest;
        private _enemies: objects.Enemy[];
        private _bonus: objects.Bonus;
        private _enemyCount: number;
        private _player: objects.Player;
        private _collision: managers.Collision;
        private _scoreLabel: objects.Label;
        private _livesLabel: objects.Label;
        
        //PUBLIC INSTANCE VARIABLES ++++++++++++
        public score: number = 0;
        public lives: number = 5;


        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        public start(): void {   
            
            // Add background music
            createjs.Sound.play("backMusic").loop = -1;
            createjs.Sound.volume = 20;
            
            //Set Enemy Count
            this._enemyCount = 7;
            
            //Instantiate Enemy array 
            this._enemies = new Array<objects.Enemy>();
                
            // added forest to the scene
            this._forest = new objects.Forest();
            this.addChild(this._forest);
            
            // added player to the secne
            this._player = new objects.Player();
            this.addChild(this._player);
            // Add playing sound
            createjs.Sound.play("bgmplaying").loop = -1;
            
            // added enemies to the scene
            for (var enemy: number = 0; enemy < this._enemyCount; enemy++) {
                this._enemies[enemy] = new objects.Enemy();
                this.addChild(this._enemies[enemy]);
            }
            
            // added collision manager to the scene
            this._collision = new managers.Collision(this._player)
            
            
            // added bonus to the scene
            this._bonus = new objects.Bonus();
            this.addChild(this._bonus);
            

            
            // added lives and score labels to the scene
            this._livesLabel = new objects.Label("Lives:", "40px Candara Bold Italic", "#FF0000", 20, 0, false);
            this.addChild(this._livesLabel);
            this._scoreLabel = new objects.Label("Score:", "40px Candara Bold Italic", "#FF0000", 425, 0, false);
            this.addChild(this._scoreLabel);
           
           
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // PLAY Scene updates here
        public update(): void {
            this._forest.update();
            this._bonus.update();
            this._player.update();
            this._enemies.forEach(enemy => {
                enemy.update();
                this._collision.check(enemy);
                this.score += 0.1;
            });

            this._collision.check(this._bonus);
            this._livesLabel.text = "Lives: " + this.lives;
            this._scoreLabel.text = "Score: " + Math.round(this.score);
            if (this.lives == 0) {              // if player's lives are zero, change the scene to the end scene. 
                createjs.Sound.stop();
                // Add dead sound
                createjs.Sound.play("bgmdead");
                scene = config.Scene.END;
                changeScene();
            }
        }
    }
}