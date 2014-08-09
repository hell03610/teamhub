require "./app"

use Rack::Static,
  :urls => ["/images", "/js", "/css"],
  :root => "public"

map '/api' do
  run Cuba
end

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('public/index.html', File::RDONLY)
  ]
}
