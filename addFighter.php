  <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Zadatak 1 </title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
<div class="row mx-5 mt-2" style="position: relative;">
<h1 >ADD FIGHTER</h1>
<a href="./index.php" class="btn btn-link align-middle" style="position: absolute;
    right: 0;">Go back</a>
</div>
    <form action="#" class="mx-5" >
    <div class="form-group row ">
    <label for="name" class="col-sm-2 col-form-label">Name</label>
        <input name="name" type="text" class="form-control col-sm-4 form-control-sm"/>
    </div>

    <div class="form-group row" >
    <label for="age" class="col-sm-2 col-form-label">Age</label>
        <input name="age" type="number" class="form-control col-sm-4 form-control-sm"/>
    </div>

    <div class="form-group row">
    <label for="info" class="col-sm-2 col-form-label">Cat info</label>
        <input name="info" type="text" class="form-control col-sm-4 form-control-sm"/>
    </div>

    <div class="form-group row">
    <label for="wins" class="col-sm-2 col-form-label">Wins</label>
        <input name="wins" type="number" class="form-control col-sm-4 form-control-sm"/>
    </div>

    <div class="form-group row">
    <label for="loss" class="col-sm-2 col-form-label">Loss</label>
        <input name="loss" type="number" class="form-control col-sm-4 form-control-sm"/>
    </div>

    <div class="form-group row">
    <label for="image" class="col-sm-2 col-form-label">Cat Image</label>
        <input name="image" type="file" class="form-control col-sm-4 form-control-sm"/>
    </div>

    <input id="submit" name="submit" type="submit" value="Submit" class="btn btn-primary"/>
    
    </form>

    <script src="./src/app.js"></script>
</body>
</html>