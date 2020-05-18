# -*- encoding: utf-8 -*-
# stub: pact-message 0.6.0 ruby lib

Gem::Specification.new do |s|
  s.name = "pact-message".freeze
  s.version = "0.6.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "allowed_push_host" => "https://rubygems.org" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Beth Skurrie".freeze]
  s.date = "2019-05-22"
  s.email = ["beth@bethesque.com".freeze]
  s.executables = ["console".freeze, "pact-message".freeze, "setup".freeze]
  s.files = ["bin/console".freeze, "bin/pact-message".freeze, "bin/setup".freeze]
  s.homepage = "http://pact.io".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "2.7.8".freeze
  s.summary = "Consumer contract library for messages".freeze

  s.installed_by_version = "2.7.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<pact-support>.freeze, ["~> 1.8"])
      s.add_runtime_dependency(%q<pact-mock_service>.freeze, ["~> 3.1"])
      s.add_runtime_dependency(%q<thor>.freeze, ["~> 0.20"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.15"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_development_dependency(%q<pry-byebug>.freeze, [">= 0"])
      s.add_development_dependency(%q<conventional-changelog>.freeze, ["~> 1.2"])
      s.add_development_dependency(%q<bump>.freeze, ["~> 0.5"])
    else
      s.add_dependency(%q<pact-support>.freeze, ["~> 1.8"])
      s.add_dependency(%q<pact-mock_service>.freeze, ["~> 3.1"])
      s.add_dependency(%q<thor>.freeze, ["~> 0.20"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.15"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_dependency(%q<pry-byebug>.freeze, [">= 0"])
      s.add_dependency(%q<conventional-changelog>.freeze, ["~> 1.2"])
      s.add_dependency(%q<bump>.freeze, ["~> 0.5"])
    end
  else
    s.add_dependency(%q<pact-support>.freeze, ["~> 1.8"])
    s.add_dependency(%q<pact-mock_service>.freeze, ["~> 3.1"])
    s.add_dependency(%q<thor>.freeze, ["~> 0.20"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.15"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_dependency(%q<pry-byebug>.freeze, [">= 0"])
    s.add_dependency(%q<conventional-changelog>.freeze, ["~> 1.2"])
    s.add_dependency(%q<bump>.freeze, ["~> 0.5"])
  end
end
