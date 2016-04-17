<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bienvenido a Gigmate</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/gigmate.css">
    <link rel="stylesheet" href="css/city-autocomplete.css">

    <!-- Google Maps' Places API -->
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&language=en"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
<body>
  <nav class="navbar navbar-default topbar">
    <div class="container-fluid">
     
      <div class="navbar-header">
        <a class="navbar-brand" href="#"><img class="logo" alt="Gigmate" src="img/logo.png"></a>
      </div>

      <form class="navbar-form navbar-right" role="search" style="padding-top: 35px;">
        <div class="form-group">
          <input type="text" class="form-control" name="username" placeholder="Correo o usuario">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" name="password" placeholder="Contraseña">
        </div>
        <button type="submit" class="btn btn-default">Iniciar</button>
      </form>

    </div>
  </nav>

  <div class="jumbotron main">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <p align="center" class="Twhite"><b>Encuentra y comparte con<br>músicos de tus mismos gustos.</b></p>
          <img style="height:300px;margin-left:50px" src="img/main.jpg">
        </div>
        <div class="col-md-3"></div>
        <div class="col-md-5">
          <!-- Registro -->
          <form role="form">
            <h2 class="Twhite">Regístrate <small class="Tclouds">Es gratis y siempre lo será.</small></h2>

            <div class="row">
              <div class="col-xs-6 col-sm-6 col-md-6">
                <div class="form-group">
                  <input type="text" name="nombre" id="nombre" class="form-control input-md" placeholder="Nombre" tabindex="1">
                </div>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6">
                <div class="form-group">
                  <input type="text" name="apellido" id="apellido" class="form-control input-md" placeholder="Apellido" tabindex="2">
                </div>
              </div>
            </div>
            <div class="form-group">
              <input type="email" name="email" id="email" class="form-control input-md" placeholder="Email" tabindex="3">
            </div>
            <div class="form-group">
              <input type="text" name ="city" id="city" class="form-control input-md" placeholder="Ciudad" tabindex="4" autocomplete="off" data-country="cl">
            </div>
            <div class="row">
              <div class="col-xs-6 col-sm-6 col-md-6">
                <div class="form-group">
                  <input type="password" name="password" id="password" class="form-control input-md" placeholder="Contraseña" tabindex="5">
                </div>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6">
                <div class="form-group">
                  <input type="password" name="password_confirmation" id="password_confirmation" class="form-control input-md" placeholder="Confirme Contraseña" tabindex="6">
                </div>
              </div>
            </div>      
            <div class="row">
              <div class="col-md-6"></div>
              <div class="col-md-6"><input type="submit" value="Registrarme" class="btn btn-primary btn-block btn-md" tabindex="7"></div>
            </div>
          </form>
       
        </div>

      </div>
    </div>
  </div>

  <center><p><b>Gigmate ® 2016 - Eduardo Hopperdieztel</b></p></center>
  
  <!-- jQuery -->
  <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
  <!-- Google Maps' Places API -->
  <script src="js/jquery.city-autocomplete.min.js" type="text/javascript"></script>
  <script>
  $('input#city').cityAutocomplete();
  </script>
  <!-- Include all compiled plugins (below), or include individual files as needed -->
  <script src="js/bootstrap.min.js"></script>
</body>
</html>