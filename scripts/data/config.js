export default
{
    "configid": "a1",
    "settings": {
        "debug": true,
        "autoKick": true,
        "autoBan": true,
        "silent": false
    },
    "modules": {
        "movement": {
            "speedA": {
                "enabled": true,
                "description":"Checks for speed cheats",
                "punishment": "kick",
                "minVlbeforePunishment": 10
            }
        },
        "combat": {
            
        },
        "world": {

        },
        "other": {

        }
    },
    "commands": {
        "moderation": {
            "ban": {
                "enabled": true,
                "requiredTags": ["op"],
                "aliases": ["b"]
            }
        },
        "utilies": {

        },
        "information": {

        },
        "assist": {

        },
        "other": {
            
        }
    }
}